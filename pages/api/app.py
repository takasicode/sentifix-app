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


clf = joblib.load(os.path.join(models_dir, 'naive_bayes_model.joblib'))
tfidf_vectorizer = joblib.load(os.path.join(
    models_dir, 'tfidf_vectorizer.joblib'))


@app.route('/')
def index():
    return '<h1>Hello</h1>'


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    if file:
        data = pd.read_excel(file)
        reviews = data['Review']
        dates = data['Timestamp'].astype(str)  # Convert Timestamp to string
        division = data['Divisi']
     
        text_tfidf = tfidf_vectorizer.transform(reviews)

        predictions = clf.predict(text_tfidf).tolist()

        insert_review_predictions(reviews, predictions, dates, division)

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
def insert_review_predictions(reviews, predictions,dates,divisions):
    print(divisions)
    cursor = mysql.get_db().cursor()

    for review, prediction,date,division in zip(reviews, predictions,dates,divisions):
        label = 'POSITIVE' if prediction == 1 else 'NEGATIVE'
        cursor.execute(
            "INSERT INTO review (review, analisis,date,division) VALUES (%s, %s,%s,%s)",
            (review, label, date,division)
        )
    
    mysql.get_db().commit()
    cursor.close()
if __name__ == '__main__':
    app.run(debug=True)
