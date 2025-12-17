import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LiveUpdate = () => {
  const { lastUpdate, updateStockPrices } = useContext(AuthContext);
  const [timeAgo, setTimeAgo] = useState('Just now');

  useEffect(() => {
    // Update time ago every minute
    const updateTime = () => {
      const now = new Date();
      const diff = now - lastUpdate;
      const minutes = Math.floor(diff / 60000);
      
      if (minutes < 1) {
        setTimeAgo('Just now');
      } else if (minutes === 1) {
        setTimeAgo('1 minute ago');
      } else {
        setTimeAgo(`${minutes} minutes ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    // Update stock prices every 30 seconds
    const priceInterval = setInterval(updateStockPrices, 30000);
    
    return () => {
      clearInterval(interval);
      clearInterval(priceInterval);
    };
  }, [lastUpdate, updateStockPrices]);

  return (
    <div className="live-update d-flex align-items-center">
      <div className="pulse-dot me-2"></div>
      <small className="text-muted">Live updates {timeAgo}</small>
    </div>
  );
};

export default LiveUpdate;