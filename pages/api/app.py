from flask import Flask, render_template, jsonify, request
from flaskext.mysql import MySQL
import joblib
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)
mysql = MySQL(app)
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'sentifix'
mysql.init_app(app)
models_dir = os.path.abspath('models')


clf = joblib.load(os.path.join(models_dir, 'vote.joblib'))
tfidf_vectorizer = joblib.load(os.path.join(
    models_dir, 'tfidf.joblib'))


@app.route('/')
def index():
    return '<h1>Hello</h1>'


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    print(file)
    if file:
        data = pd.read_excel(file)
        baseReviews = data['Review']
        reviews = data['Review'].apply(preprocessing)
        dates = data['Timestamp'].astype(str)  # Convert Timestamp to string
        division = data['Divisi']
     
        text_tfidf = tfidf_vectorizer.transform(reviews)

        predictions = clf.predict(text_tfidf).tolist()

        insert_review_predictions(baseReviews, predictions, dates, division)

        results = []
        for review, prediction, timestamp, divisi in zip(reviews, predictions, dates, division):
            result_dict = {
                'text': review,
                'prediction': prediction,
                'timestamp': timestamp,
                'divisi': divisi
            }
            results.append(result_dict)

        return jsonify({'results': results})
    else:
        return jsonify({'error': 'No file uploaded'})
    
@app.route('/singleInputs', methods=['POST'])
def singleInputs():
    request_json = request.form
    text = request_json["text"]
    if text:
        preprocessed = preprocessing(text)
        
        text_list = [preprocessed]
     
        text_tfidf = tfidf_vectorizer.transform(text_list)

        predictions = clf.predict(text_tfidf).tolist()

        print(predictions)
        return jsonify({'results': predictions})
    else:
        return jsonify({'error': 'No Text Detected'})


def insert_review_predictions(reviews, predictions,dates,divisions):
    print(divisions)
    cursor = mysql.get_db().cursor()

    for review, prediction,date,division in zip(reviews, predictions,dates,divisions):
        label = 'POSITIVE' if prediction == 1 else ('NEUTRAL' if prediction == 2 else 'NEGATIVE')
        cursor.execute(
            "INSERT INTO review (review, analisis,date,division) VALUES (%s, %s,%s,%s)",
            (review, label, date,division)
        )
    
    mysql.get_db().commit()
    cursor.close()
if __name__ == '__main__':
    app.run(debug=True)

import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

import re
def casefolding(text):
    text = text.lower()
    text = text.strip(" ")
    text = re.sub(r'[?|$|.|!²_:")(-+,]','',text)
    return text

#tokenizing
def nGramToken(text, ngram=2):
    words = [word for word in text.split(" ") if word not in set(stopwords.words('indonesian'))]
    
    # Keep single words
    if len(words) == 1:
        return words

    temp = zip(*[words[i:] for i in range(0, ngram)])
    ans = [' '.join(ngram) for ngram in temp]
    return ans
def stopword_removal(text):
    filters = stopwords.words('indonesian')
    x = []
    data =[]
    def func(x):
        if x in filters:
            return False
        else:
            return True
    fit = filter(func,text)
    for x in fit:
        data.append(x)
    return data

from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
def stemming(text):
    factory = StemmerFactory()
    stemmer = factory.create_stemmer()
    do = []
    for w in text:
        dt = stemmer.stem(w)
        do.append(dt)
    d_clean=[]
    d_clean=" ".join(do)
  
    return d_clean
def preprocessing(str):
    str = casefolding(str)
   
    str = nGramToken(str)
    str = stopword_removal(str)
    str = stemming(str)
    
    return str