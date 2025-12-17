import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { stockList } from "../utils/stockData.jsx";

const QuickTrade = () => {
  const { placeOrder, funds, holdings } = useContext(AuthContext);
  const [selectedStock, setSelectedStock] = useState(stockList[0]);
  const [action, setAction] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [isTrading, setIsTrading] = useState(false);

  // Calculate max quantity you can buy/sell
  const maxBuyQuantity = Math.floor(funds / selectedStock.currentPrice);
  const userHolding = holdings.find(h => h.symbol === selectedStock.symbol);
  const maxSellQuantity = userHolding ? userHolding.quantity : 0;

  const handleTrade = async () => {
    if (quantity <= 0) {
      setMessage('❌ Quantity must be at least 1');
      return;
    }

    if (action === 'buy' && quantity > maxBuyQuantity) {
      setMessage(`❌ You can only buy ${maxBuyQuantity} shares with available funds`);
      return;
    }

    if (action === 'sell' && quantity > maxSellQuantity) {
      setMessage(`❌ You only have ${maxSellQuantity} shares to sell`);
      return;
    }

    setIsTrading(true);
    setMessage('');

    try {
      const order = {
        type: action,
        symbol: selectedStock.symbol,
        name: selectedStock.name,
        quantity: parseInt(quantity),
        price: selectedStock.currentPrice,
        total: selectedStock.currentPrice * quantity
      };

      placeOrder(order);
      
      setMessage(`✅ ${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${selectedStock.symbol} at ₹${selectedStock.currentPrice.toFixed(2)}`);
      
      // Reset quantity
      setQuantity(1);
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      setMessage('❌ Trade failed. Please try again.');
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="fas fa-bolt me-2 text-warning"></i>
          Quick Trade
        </h5>
      </div>
      <div className="card-body">
        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} mb-3`}>
            <i className={`fas fa-${message.includes('✅') ? 'check-circle' : 'exclamation-circle'} me-2`}></i>
            {message}
          </div>
        )}

        {/* Stock Selection */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Stock</label>
          <select 
            className="form-select"
            value={selectedStock.symbol}
            onChange={(e) => {
              const stock = stockList.find(s => s.symbol === e.target.value);
              if (stock) setSelectedStock(stock);
            }}
          >
            {stockList.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name} (₹{stock.currentPrice.toFixed(2)})
              </option>
            ))}
          </select>
          <div className="mt-1 d-flex justify-content-between">
            <small className="text-muted">Current: ₹{selectedStock.currentPrice.toFixed(2)}</small>
            <small className={selectedStock.change >= 0 ? 'text-success' : 'text-danger'}>
              {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent}%
            </small>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-3">
          <label className="form-label fw-bold">Action</label>
          <div className="btn-group w-100" role="group">
            <button
              type="button"
              className={`btn ${action === 'buy' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setAction('buy')}
            >
              <i className="fas fa-shopping-cart me-1"></i>
              BUY
            </button>
            <button
              type="button"
              className={`btn ${action === 'sell' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setAction('sell')}
            >
              <i className="fas fa-money-bill-wave me-1"></i>
              SELL
            </button>
          </div>
        </div>

        {/* Quantity Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Quantity 
            <small className="text-muted ms-2">
              {action === 'buy' 
                ? `(Max: ${maxBuyQuantity})` 
                : `(You have: ${maxSellQuantity})`}
            </small>
          </label>
          <div className="input-group">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <i className="fas fa-minus"></i>
            </button>
            <input
              type="number"
              className="form-control text-center"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max={action === 'buy' ? maxBuyQuantity : maxSellQuantity}
            />
            <button 
              className="btn btn-outline-secondary"
              onClick={() => setQuantity(quantity + 1)}
              disabled={action === 'buy' ? quantity >= maxBuyQuantity : quantity >= maxSellQuantity}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Trade Info */}
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Price per share:</span>
            <strong>₹{selectedStock.currentPrice.toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Total Amount:</span>
            <strong className="text-primary">
              ₹{(selectedStock.currentPrice * quantity).toFixed(2)}
            </strong>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Available Funds:</span>
            <strong className="text-success">₹{funds.toFixed(2)}</strong>
          </div>
        </div>

        {/* Execute Button */}
        <button
          className={`btn btn-${action === 'buy' ? 'success' : 'danger'} btn-lg w-100`}
          onClick={handleTrade}
          disabled={isTrading || (action === 'buy' && maxBuyQuantity === 0) || (action === 'sell' && maxSellQuantity === 0)}
        >
          {isTrading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Processing...
            </>
          ) : (
            <>
              <i className={`fas fa-${action === 'buy' ? 'shopping-cart' : 'money-bill-wave'} me-2`}></i>
              {action === 'buy' ? 'BUY NOW' : 'SELL NOW'}
            </>
          )}
        </button>

        {/* Quick Stats */}
        <div className="mt-3 text-center">
          <small className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            Brokerage: ₹20 per trade
          </small>
        </div>
      </div>
    </div>
  );
};

export default QuickTrade;