# Data Files Documentation

## movies.csv

- **Size:** 62,424 rows
- **Columns:** movieId, title, genres
- **Purpose:** Original MovieLens dataset
- **Status:** Source data for enrichment

## movies_with_metadata.csv

- **Size:** 20,815 rows
- **Columns:** movieId, title, genres + TMDB metadata (overview, poster_path, vote_average, etc.)
- **Purpose:** Enriched dataset with TMDB API data
- **Status:** **ACTIVELY USED** by app.py for recommendations

## Note

The backend (`app.py`) uses `movies_with_metadata.csv` which is a subset of movies.csv that has been successfully enriched with TMDB data.
