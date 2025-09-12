import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SeriesForm from '../components/SeriesForm';
import { seriesApi } from '../services/api';

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
          ★
        </span>
      ))}
    </div>
  );
};

const HomePage = () => {
  const [series, setSeries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load series on component mount
  useEffect(() => {
    loadSeries();
  }, []);

  const loadSeries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await seriesApi.getAllSeries();
      setSeries(response.data);
    } catch (err) {
      setError('Failed to load series');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSeries = async (newSeries) => {
    try {
      setLoading(true);
      setError(null);
      const response = await seriesApi.createSeries(newSeries);
      setSeries([...series, response.data]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create series');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeries = async (id) => {
    if (window.confirm('Are you sure you want to delete this series?')) {
      try {
        setLoading(true);
        setError(null);
        await seriesApi.deleteSeries(id);
        setSeries(series.filter(item => item.id !== id));
      } catch (err) {
        setError('Failed to delete series');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      <button
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
        disabled={loading}
      >
        Add New Series
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <SeriesForm
          onSubmit={handleAddSeries}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="series-grid">
        {series.map((item) => (
          <div key={item.id} className="series-card">
            <h3>{item.name}</h3>
            <StarRating rating={item.rating} />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                className="btn btn-outline"
                onClick={() => navigate(`/details/${item.id}`)}
                disabled={loading}
              >
                View Details
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteSeries(item.id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {series.length === 0 && !loading && !error && (
        <div className="empty-state">
          <p>No series found. Add your first one!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
