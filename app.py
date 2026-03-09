from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import json
import joblib

app = Flask(__name__)
from flask_cors import CORS

# Restrict CORS to frontend only
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# Load data
movies = pd.read_csv('movies_with_metadata.csv')
movies['soup'] = movies['genres'].fillna('') + " " + movies['title'].fillna('')

# Vectorize
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(movies['soup'])

# KNN Model
knn = NearestNeighbors(n_neighbors=10, metric='cosine')
knn.fit(tfidf_matrix)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    input_text = data.get('query', '').strip()
    
    if not input_text:
        return jsonify({"error": "Query cannot be empty"}), 400

    # Try to get index of exact or close movie title (case-insensitive)
    idx = None
    input_lower = input_text.lower()
    
    # Check for case-insensitive exact match
    title_match = movies[movies['title'].str.lower() == input_lower]
    if not title_match.empty:
        idx = title_match.index[0]

    # Build query vector: use exact movie vector if found, else transform input text
    if idx is not None:
        query_vector = tfidf_matrix[idx]
    else:
        query_vector = tfidf.transform([input_text])

    # Always run KNN neighbors, fallback to top 10 anyway
    distances, indices = knn.kneighbors(query_vector, n_neighbors=10)
    results = movies.iloc[indices[0]].to_dict(orient='records')
    
    # Clean up results - remove internal fields
    for movie in results:
        movie.pop('soup', None)
        movie.pop('movieId', None)
    
    return jsonify(results)


@app.route('/')
def index():
    return 'Movie Recommender Backend Running'

if __name__ == '__main__':
    app.run(debug=True)
