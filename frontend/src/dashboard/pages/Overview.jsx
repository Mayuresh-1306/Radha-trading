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

  const statCards = [
    {
      title: 'PORTFOLIO VALUE',
      value: `₹${stats.totalCurrentValue.toLocaleString('en-IN')}`,
      sub: `${stats.totalPnl >= 0 ? '+' : ''}₹${stats.totalPnl.toFixed(2)} (${stats.pnlPercentage.toFixed(2)}%)`,
      subClass: stats.totalPnl >= 0 ? 'text-success' : 'text-danger',
      icon: 'fas fa-wallet',
      gradient: 'stat-gradient-blue'
    },
    {
      title: 'AVAILABLE FUNDS',
      value: `₹${stats.availableFunds.toLocaleString('en-IN')}`,
      sub: 'Ready to trade',
      subClass: 'text-white-50',
      icon: 'fas fa-rupee-sign',
      gradient: 'stat-gradient-green'
    },
    {
      title: 'TOTAL HOLDINGS',
      value: holdings.length,
      sub: 'Stocks in portfolio',
      subClass: 'text-white-50',
      icon: 'fas fa-landmark',
      gradient: 'stat-gradient-purple'
    },
    {
      title: 'TOTAL ORDERS',
      value: orders.length,
      sub: 'All time trades',
      subClass: 'text-white-50',
      icon: 'fas fa-shopping-cart',
      gradient: 'stat-gradient-orange'
    }
  ];

  return (
    <div className="overview-page">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          <i className="fas fa-tachometer-alt me-2 text-primary"></i>
          Trading Dashboard
        </h1>
        <LiveUpdate />
      </div>

      {/* Glassmorphism Stats Cards */}
      <div className="row mb-4">
        {statCards.map((card, i) => (
          <div className="col-xl-3 col-md-6 mb-3" key={i}>
            <div className={`dash-stat-card ${card.gradient}`}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="stat-card-label">{card.title}</h6>
                  <h2 className="stat-card-value">{card.value}</h2>
                  <small className={card.subClass}>{card.sub}</small>
                </div>
                <div className="stat-card-icon">
                  <i className={card.icon}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trading Section */}
      <div className="row mb-4">
        <div className="col-lg-6">
          <QuickTrade />
        </div>

        <div className="col-lg-6">
          <div className="dash-card h-100">
            <div className="dash-card-header">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2 text-primary"></i>
                Market Watch
              </h5>
            </div>
            <div className="dash-card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 dash-table">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Last Price</th>
                      <th>Change</th>
                      <th>Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockList.slice(0, 6).map((stock) => (
                      <tr key={stock.symbol}>
                        <td>
                          <strong>{stock.symbol}</strong>
                          <div className="small text-muted">{stock.name}</div>
                        </td>
                        <td className="fw-bold">₹{stock.currentPrice.toFixed(2)}</td>
                        <td>
                          <span className={`change-badge ${stock.change >= 0 ? 'change-up' : 'change-down'}`}>
                            <i className={`fas fa-arrow-${stock.change >= 0 ? 'up' : 'down'} me-1`}></i>
                            {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                          </span>
                        </td>
                        <td>
                          <span className="sector-badge">{stock.sector}</span>
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
          <div className="dash-card h-100">
            <div className="dash-card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-history me-2 text-info"></i>
                Recent Orders
              </h5>
              <a href="/dashboard/orders" className="btn btn-sm btn-outline-primary">
                View All
              </a>
            </div>
            <div className="dash-card-body p-0">
              {recentOrders.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="list-group-item border-0 px-3 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className={`order-badge ${order.type === 'buy' ? 'order-buy' : 'order-sell'}`}>
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
                            {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          <div className="dash-card h-100">
            <div className="dash-card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-landmark me-2 text-success"></i>
                Current Holdings
              </h5>
              <a href="/dashboard/holdings" className="btn btn-sm btn-outline-primary">
                View All
              </a>
            </div>
            <div className="dash-card-body p-0">
              {topHoldings.length > 0 ? (
                <div className="list-group list-group-flush">
                  {topHoldings.map((holding) => (
                    <div key={holding.symbol} className="list-group-item border-0 px-3 py-3">
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