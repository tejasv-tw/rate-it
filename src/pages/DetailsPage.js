import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { seriesApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

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

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allSeries, setAllSeries] = useState([]);
  const [currentSeries, setCurrentSeries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSeriesDetails();
  }, [id]);

  // Nested API calls - demonstrate dependent promise pattern
  const loadSeriesDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First API call: Get all series
      console.log('🔄 Step 1: Loading all series...');
      const allSeriesResponse = await seriesApi.getAllSeries();
      setAllSeries(allSeriesResponse.data);
      console.log('✅ Step 1 complete: All series loaded');
      
      // Second API call: Get specific series details (dependent on first call)
      console.log('🔄 Step 2: Loading series details...');
      const seriesResponse = await seriesApi.getSeriesById(id);
      setCurrentSeries(seriesResponse.data);
      console.log('✅ Step 2 complete: Series details loaded');
      
    } catch (err) {
      setError('Failed to load series details');
      console.error('❌ API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="details-page">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  if (!currentSeries) {
    return (
      <div className="details-page">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <h2>Series not found</h2>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button 
        className="btn btn-secondary"
        onClick={() => navigate('/')}
        style={{ marginBottom: '2rem' }}
      >
        ← Back
      </button>
      
      <h1>{currentSeries.name}</h1>
      <p><strong>ID:</strong> {currentSeries.id}</p>
      <StarRating rating={currentSeries.rating} />
    </div>
  );
};

export default DetailsPage;