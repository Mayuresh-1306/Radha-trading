import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { stockList } from '../../utils/stockData';

const TradingWidget = () => {
  const { placeOrder, funds } = useContext(AuthContext);
  const [selectedStock, setSelectedStock] = useState(stockList[0]);
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stockList[0].currentPrice);
  const [totalAmount, setTotalAmount] = useState(stockList[0].currentPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleStockChange = (symbol) => {
    const stock = stockList.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
      setPrice(stock.currentPrice);
      calculateTotal(stock.currentPrice, quantity);
    }
  };

  const calculateTotal = (price, qty) => {
    const total = price * qty;
    setTotalAmount(total);
  };

  const handleQuantityChange = (qty) => {
    const newQty = Math.max(1, qty);
    setQuantity(newQty);
    calculateTotal(price, newQty);
  };

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
    calculateTotal(newPrice, quantity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (orderType === 'buy' && totalAmount > funds) {
      setMessage({ 
        type: 'error', 
        text: `Insufficient funds. Available: ₹${funds.toFixed(2)}` 
      });
      setIsSubmitting(false);
      return;
    }

    if (quantity <= 0) {
      setMessage({ type: 'error', text: 'Quantity must be at least 1' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = {
        type: orderType,
        symbol: selectedStock.symbol,
        name: selectedStock.name,
        quantity: quantity,
        price: price,
        total: totalAmount
      };

      placeOrder(order);
      
      setMessage({ 
        type: 'success', 
        text: `${orderType.toUpperCase()} order for ${quantity} shares of ${selectedStock.symbol} executed successfully!` 
      });
      
      // Reset form
      setQuantity(1);
      calculateTotal(selectedStock.currentPrice, 1);
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Order failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trading-widget">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Stock Selection */}
          <div className="col-md-6">
            <label className="form-label">
              <i className="fas fa-chart-line me-2"></i>
              Select Stock
            </label>
            <select 
              className="form-select"
              value={selectedStock.symbol}
              onChange={(e) => handleStockChange(e.target.value)}
              disabled={isSubmitting}
            >
              {stockList.map((stock) => (
                <option key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - {stock.name} (₹{stock.currentPrice.toFixed(2)})
                </option>
              ))}
            </select>
            
            <div className="mt-2">
              <div className="d-flex justify-content-between">
                <small className="text-muted">Current Price:</small>
                <small className="fw-bold">₹{selectedStock.currentPrice.toFixed(2)}</small>
              </div>
              <div className="d-flex justify-content-between">
                <small className="text-muted">Change:</small>
                <small className={selectedStock.change >= 0 ? 'text-success' : 'text-danger'}>
                  {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent}%)
                </small>
              </div>
            </div>
          </div>

          {/* Order Type */}
          <div className="col-md-6">
            <label className="form-label">
              <i className="fas fa-exchange-alt me-2"></i>
              Order Type
            </label>
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn ${orderType === 'buy' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setOrderType('buy')}
                disabled={isSubmitting}
              >
                <i className="fas fa-shopping-cart me-1"></i>
                BUY
              </button>
              <button
                type="button"
                className={`btn ${orderType === 'sell' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setOrderType('sell')}
                disabled={isSubmitting}
              >
                <i className="fas fa-money-bill-wave me-1"></i>
                SELL
              </button>
            </div>
            
            <div className="mt-2">
              <div className="d-flex justify-content-between">
                <small className="text-muted">Available Funds:</small>
                <small className="fw-bold text-success">₹{funds.toFixed(2)}</small>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="col-md-4">
            <label className="form-label">
              <i className="fas fa-layer-group me-2"></i>
              Quantity
            </label>
            <div className="input-group">
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isSubmitting || quantity <= 1}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                disabled={isSubmitting}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isSubmitting}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="col-md-4">
            <label className="form-label">
              <i className="fas fa-tag me-2"></i>
              Price (₹)
            </label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => handlePriceChange(parseFloat(e.target.value) || 0)}
              step="0.01"
              min="0.01"
              disabled={isSubmitting}
            />
            <div className="mt-1">
              <button 
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => handlePriceChange(selectedStock.currentPrice)}
                disabled={isSubmitting}
              >
                Market Price
              </button>
            </div>
          </div>

          {/* Total Amount */}
          <div className="col-md-4">
            <label className="form-label">
              <i className="fas fa-calculator me-2"></i>
              Total Amount
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="text"
                className="form-control bg-light"
                value={totalAmount.toFixed(2)}
                readOnly
              />
            </div>
            <small className="text-muted">
              Brokerage: ₹{orderType === 'buy' ? '20' : '20'} + GST
            </small>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className="col-12">
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2`}></i>
                {message.text}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-12">
            <button
              type="submit"
              className={`btn btn-${orderType === 'buy' ? 'success' : 'danger'} btn-lg w-100`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Processing...
                </>
              ) : (
                <>
                  <i className={`fas fa-${orderType === 'buy' ? 'shopping-cart' : 'money-bill-wave'} me-2`}></i>
                  {orderType === 'buy' ? 'BUY' : 'SELL'} {quantity} SHARES OF {selectedStock.symbol}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TradingWidget;