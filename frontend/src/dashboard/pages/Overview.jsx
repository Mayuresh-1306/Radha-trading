import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import QuickTrade from '../components/QuickTrade';
import LiveUpdate from '../components/LiveUpdate';
import { stockList } from "../utils/stockData.jsx";

const Overview = () => {
  const { getPortfolioStats, holdings, funds, orders, lastUpdate } = useContext(AuthContext);
  
  const stats = getPortfolioStats();
  const recentOrders = orders.slice(0, 5);
  const topHoldings = holdings.slice(0, 5);

  return (
    <div className="overview-page">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Trading Dashboard</h1>
        <LiveUpdate />
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100 bg-primary bg-gradient text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-2">PORTFOLIO VALUE</h6>
                  <h2 className="mb-0">₹{stats.totalCurrentValue.toLocaleString('en-IN')}</h2>
                  <small className={`${stats.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    {stats.totalPnl >= 0 ? '+' : ''}₹{stats.totalPnl.toFixed(2)} ({stats.pnlPercentage.toFixed(2)}%)
                  </small>
                </div>
                <i className="fas fa-wallet fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100 bg-success bg-gradient text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-2">AVAILABLE FUNDS</h6>
                  <h2 className="mb-0">₹{stats.availableFunds.toLocaleString('en-IN')}</h2>
                  <small className="text-white-50">Ready to trade</small>
                </div>
                <i className="fas fa-rupee-sign fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100 bg-info bg-gradient text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-2">TOTAL HOLDINGS</h6>
                  <h2 className="mb-0">{holdings.length}</h2>
                  <small className="text-white-50">Stocks in portfolio</small>
                </div>
                <i className="fas fa-landmark fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100 bg-warning bg-gradient text-dark">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-dark-50 mb-2">TOTAL ORDERS</h6>
                  <h2 className="mb-0">{orders.length}</h2>
                  <small className="text-dark-50">All time trades</small>
                </div>
                <i className="fas fa-shopping-cart fa-2x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Section */}
      <div className="row mb-4">
        <div className="col-lg-6">
          <QuickTrade />
        </div>
        
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2 text-primary"></i>
                Market Watch
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Last Price</th>
                      <th>Change</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockList.slice(0, 5).map((stock) => (
                      <tr key={stock.symbol}>
                        <td>
                          <strong>{stock.symbol}</strong>
                          <div className="small text-muted">{stock.name}</div>
                        </td>
                        <td className="fw-bold">₹{stock.currentPrice.toFixed(2)}</td>
                        <td>
                          <span className={stock.change >= 0 ? 'text-success' : 'text-danger'}>
                            <i className={`fas fa-arrow-${stock.change >= 0 ? 'up' : 'down'} me-1`}></i>
                            {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {stock.sector}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-history me-2 text-info"></i>
                Recent Orders
              </h5>
              <a href="/dashboard/orders" className="btn btn-sm btn-outline-primary">
                View All
              </a>
            </div>
            <div className="card-body p-0">
              {recentOrders.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="list-group-item border-0 px-0 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className={`badge ${order.type === 'buy' ? 'bg-success' : 'bg-danger'}`}>
                            {order.type.toUpperCase()}
                          </span>
                          <strong className="ms-2">{order.symbol}</strong>
                          <div className="small text-muted">
                            {order.quantity} shares @ ₹{order.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">₹{order.total.toFixed(2)}</div>
                          <small className="text-muted">
                            {new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-shopping-cart fa-2x text-muted mb-3"></i>
                  <p className="text-muted">No orders yet. Place your first trade!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-landmark me-2 text-success"></i>
                Current Holdings
              </h5>
              <a href="/dashboard/holdings" className="btn btn-sm btn-outline-primary">
                View All
              </a>
            </div>
            <div className="card-body p-0">
              {topHoldings.length > 0 ? (
                <div className="list-group list-group-flush">
                  {topHoldings.map((holding) => (
                    <div key={holding.symbol} className="list-group-item border-0 px-0 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{holding.symbol}</strong>
                          <div className="small text-muted">
                            {holding.quantity} shares
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">₹{holding.currentValue.toFixed(2)}</div>
                          <small className={holding.pnl >= 0 ? 'text-success' : 'text-danger'}>
                            {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toFixed(2)}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-landmark fa-2x text-muted mb-3"></i>
                  <p className="text-muted">No holdings yet. Buy your first stock!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;