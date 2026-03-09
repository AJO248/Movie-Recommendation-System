import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);  // Always an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // Track if a search was made

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    setSearched(false);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Fetching from:', `${API_URL}/recommend`);
      console.log('Query:', query);
      
      const response = await axios.post(`${API_URL}/recommend`, { query });
      console.log('Response:', response.data);
      
      const data = Array.isArray(response.data) ? response.data : [];
      console.log('Parsed data length:', data.length);
      
      setResults(data);
      setSearched(true);
    } catch (err) {
      console.error('Error details:', err);
      console.error('Error response:', err.response);
      setError(`Failed to fetch recommendations: ${err.message}. Make sure the backend is running on port 5000.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🎬 Movie Recommender</h1>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Enter a movie title (e.g., Toy Story, Inception)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && searched && results.length === 0 && !error && (
  <div style={{ opacity: 0.9 }}>
    <p>No exact matches found for "<strong>{query}</strong>".</p>
    <p>Here are some random picks you might like:</p>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {[
        { title: "Inception", genres: "Action, Sci-Fi" },
        { title: "The Shawshank Redemption", genres: "Drama" },
        { title: "Interstellar", genres: "Adventure, Drama, Sci-Fi" },
        { title: "The Dark Knight", genres: "Action, Crime, Drama" },
        { title: "Pulp Fiction", genres: "Crime, Drama" },
      ].sort(() => 0.5 - Math.random()).slice(0, 3).map((movie, idx) => (
        <li
          key={idx}
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <strong>{movie.title}</strong><br />
          <em>{movie.genres}</em>
        </li>
      ))}
    </ul>
  </div>
)}
      {!loading && !searched && (
        <p style={{ opacity: 0.7 }}>No recommendations yet. Try searching!</p>
      )}

      {Array.isArray(results) && results.length > 0 && (
        <div>
          <h2 style={{ color: '#fddb3a', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Recommended Movies:
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((movie, idx) => (
              <li
                key={idx}
                style={{
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <strong style={{ fontSize: '1.1rem', color: '#fddb3a' }}>{movie.title}</strong>
                <br />
                <em style={{ color: '#b0b0b0' }}>{movie.genres || 'No genre info'}</em>
                {movie.overview && (
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#d0d0d0' }}>
                    {movie.overview.substring(0, 150)}...
                  </p>
                )}
                {movie.vote_average && (
                  <span style={{ fontSize: '0.9rem', color: '#fddb3a' }}>
                    ⭐ {movie.vote_average}/10
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
