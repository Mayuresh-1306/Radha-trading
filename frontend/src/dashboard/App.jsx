import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from './layout/DashboardLayout';

// Dashboard Pages
import Overview from './pages/Overview';
import Portfolio from './pages/Portfolio';
import Orders from './pages/Orders';
import Holdings from './pages/Holdings';
import Funds from './pages/Funds';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

// Import dashboard styles
import './dashboard.css';

const DashboardApp = () => {
  const { updateStockPrices } = useContext(AuthContext);

  // Update stock prices every 30 seconds (simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      updateStockPrices();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [updateStockPrices]);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* 404 within dashboard */}
        <Route path="*" element={
          <div className="container py-5">
            <div className="text-center">
              <h1>Dashboard Page Not Found</h1>
              <p>The requested dashboard page doesn't exist.</p>
            </div>
          </div>
        } />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardApp;