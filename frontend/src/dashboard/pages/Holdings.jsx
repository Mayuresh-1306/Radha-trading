import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Holdings = () => {
  const { holdings, getPortfolioStats } = useContext(AuthContext);
  const stats = getPortfolioStats();

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Current Holdings</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <span className="badge bg-primary">
            {holdings.length} holdings
          </span>
        </div>
      </div>

      {/* Holdings Summary */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Investment</h6>
                  <h4 className="mb-0">₹{stats.totalInvestment.toLocaleString('en-IN')}</h4>
                </div>
                <i className="fas fa-money-bill-wave fa-2x text-primary opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Current Value</h6>
                  <h4 className="mb-0">₹{stats.totalCurrentValue.toLocaleString('en-IN')}</h4>
                </div>
                <i className="fas fa-chart-line fa-2x text-success opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total P&L</h6>
                  <h4 className={`mb-0 ${stats.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    ₹{stats.totalPnl.toFixed(2)} ({stats.pnlPercentage.toFixed(2)}%)
                  </h4>
                </div>
                <i className="fas fa-percentage fa-2x text-warning opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">All Holdings</h5>
        </div>
        <div className="card-body p-0">
          {holdings.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
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

export default Holdings;