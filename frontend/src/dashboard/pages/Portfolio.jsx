import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Portfolio = () => {
  const { getPortfolioStats, holdings, funds } = useContext(AuthContext);
  const [timeFilter, setTimeFilter] = useState('1M');
  
  const stats = getPortfolioStats();
  
  const timeFilters = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Portfolio</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            {timeFilters.map((filter) => (
              <button
                key={filter.value}
                className={`btn btn-sm ${timeFilter === filter.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTimeFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Portfolio Performance</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Total Investment</span>
                    <span className="fw-bold">₹{stats.totalInvestment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Current Value</span>
                    <span className="fw-bold text-success">₹{stats.totalCurrentValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Total P&L</span>
                    <span className={`fw-bold ${stats.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      ₹{stats.totalPnl.toFixed(2)} ({stats.pnlPercentage.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Available Funds</span>
                    <span className="fw-bold text-primary">₹{stats.availableFunds.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center py-4">
                    <div className="display-4 fw-bold mb-2" style={{ 
                      color: stats.pnlPercentage >= 0 ? '#198754' : '#dc3545' 
                    }}>
                      {stats.pnlPercentage >= 0 ? '+' : ''}{stats.pnlPercentage.toFixed(2)}%
                    </div>
                    <div className="text-muted">Overall Returns</div>
                    <div className="mt-3">
                      <span className={`badge ${stats.totalPnl >= 0 ? 'bg-success' : 'bg-danger'} p-2`}>
                        {stats.totalPnl >= 0 ? 'Profit' : 'Loss'}: ₹{Math.abs(stats.totalPnl).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2 text-warning"></i>
                Investment Tips
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0 py-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Diversify across sectors</small>
                </div>
                <div className="list-group-item border-0 px-0 py-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Invest for long term growth</small>
                </div>
                <div className="list-group-item border-0 px-0 py-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Review portfolio regularly</small>
                </div>
                <div className="list-group-item border-0 px-0 py-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Keep emergency funds separate</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Distribution */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Holdings Distribution</h5>
          <span className="text-muted">{holdings.length} holdings</span>
        </div>
        <div className="card-body">
          {holdings.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>Investment</th>
                    <th>Current Value</th>
                    <th>P&L</th>
                    <th>Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => {
                    const allocation = (holding.currentValue / stats.totalCurrentValue) * 100;
                    return (
                      <tr key={holding.symbol}>
                        <td>
                          <div>
                            <strong>{holding.symbol}</strong>
                            <div className="small text-muted">{holding.name}</div>
                          </div>
                        </td>
                        <td>{holding.quantity}</td>
                        <td>₹{holding.avgPrice.toFixed(2)}</td>
                        <td>₹{holding.currentPrice.toFixed(2)}</td>
                        <td>₹{holding.investment.toFixed(2)}</td>
                        <td>₹{holding.currentValue.toFixed(2)}</td>
                        <td>
                          <span className={holding.pnl >= 0 ? 'text-success' : 'text-danger'}>
                            ₹{holding.pnl.toFixed(2)} ({holding.pnlPercentage.toFixed(2)}%)
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                              <div 
                                className={`progress-bar ${allocation > 20 ? 'bg-success' : allocation > 10 ? 'bg-info' : 'bg-primary'}`}
                                style={{ width: `${Math.min(allocation, 100)}%` }}
                              ></div>
                            </div>
                            <small>{allocation.toFixed(1)}%</small>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-landmark fa-3x text-muted mb-3"></i>
              <p className="text-muted">No holdings in your portfolio</p>
              <a href="/dashboard" className="btn btn-primary">
                Start Trading
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;