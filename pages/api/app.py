from flask import Flask, render_template, jsonify, request
import joblib
import pandas as pd
import os


app = Flask(__name__)


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

        text_tfidf = tfidf_vectorizer.transform(reviews)

        predictions = clf.predict(text_tfidf).tolist()
        results = []
        for review, prediction in zip(reviews, predictions):
            result_dict = {
                'text': review,
                'prediction': prediction
            }
            results.append(result_dict)
       

        return jsonify({'results': results})
    else:
        return jsonify({'error': 'No file uploaded'})


if __name__ == '__main__':
    app.run(debug=True)
