import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import AuthProvider from './components/AuthProvider/AuthProvider';
import MainApiProvider from './components/MainApiProvider';
import MoviesApiProvider from './components/MoviesApiProvider/MoviesApiProvider';
import SavedDataProvider from './components/SavedDataProvider';

import './vendor/fonts/fonts.css';
import './vendor/normalize.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SavedDataProvider>
    <AuthProvider>
      <MoviesApiProvider>
        <MainApiProvider>
          <App/>
        </MainApiProvider>
      </MoviesApiProvider>
    </AuthProvider>
  </SavedDataProvider>
);
