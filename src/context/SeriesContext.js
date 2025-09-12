import React, { createContext, useContext, useReducer } from 'react';

const SeriesContext = createContext();

const initialState = {
  series: [],
  loading: false,
  error: null,
  currentSeries: null
};

const seriesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SERIES':
      return { ...state, series: action.payload, loading: false, error: null };
    case 'SET_CURRENT_SERIES':
      return { ...state, currentSeries: action.payload, loading: false, error: null };
    case 'ADD_SERIES':
      return { 
        ...state, 
        series: [...state.series, action.payload],
        loading: false,
        error: null 
      };
    case 'UPDATE_SERIES':
      return {
        ...state,
        series: state.series.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null
      };
    case 'DELETE_SERIES':
      return {
        ...state,
        series: state.series.filter(item => item.id !== action.payload),
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export const SeriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(seriesReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <SeriesContext.Provider value={value}>
      {children}
    </SeriesContext.Provider>
  );
};

export const useSeriesContext = () => {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error('useSeriesContext must be used within a SeriesProvider');
  }
  return context;
};