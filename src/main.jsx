import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import VideoGeneration from "./Pages/VideoGeneration/VideoGeneration"
import DashboardLayoutBasic from './Components/Dashboard/Dashboard';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HelmetProvider>
        <DashboardLayoutBasic />
      </HelmetProvider>
    </React.StrictMode>
  );