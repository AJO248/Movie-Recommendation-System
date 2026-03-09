# Movie Recommendation System

A content-based movie recommendation system using machine learning to suggest similar movies based on user input.

## Tech Stack

**Backend:** Flask, scikit-learn (TF-IDF, KNN)  
**Frontend:** React + Vite  
**Data:** CSV-based movie dataset with metadata

## Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- TMDB API Key

### Backend Setup

1. **Create and activate virtual environment:**

```bash
python3 -m venv venv
source venv/bin/activate
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Run Flask server:**

```bash
python app.py
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies:**

```bash
cd recommender
npm install
```

2. **Run development server:**

```bash
npm run dev
```

App runs on `http://localhost:5173`

## Usage

1. Start the Flask backend
2. Start the React frontend
3. Enter a movie title in the search box
4. Get 10 similar movie recommendations

## How It Works

The system uses:

- **TF-IDF Vectorization** to convert movie genres and titles into numerical features
- **K-Nearest Neighbors (KNN)** with cosine similarity to find similar movies
- **Content-based filtering** based on movie metadata
