import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Orders = () => {
  const { orders } = useContext(AuthContext);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.type === filter;
    const matchesSearch = order.symbol.toLowerCase().includes(search.toLowerCase()) || 
                         order.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'executed': return <span className="badge bg-success">Executed</span>;
      case 'pending': return <span className="badge bg-warning">Pending</span>;
      case 'cancelled': return <span className="badge bg-danger">Cancelled</span>;
      default: return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getTypeBadge = (type) => {
    return (
      <span className={`badge ${type === 'buy' ? 'bg-success' : 'bg-danger'}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  const totalBuyOrders = orders.filter(o => o.type === 'buy').length;
  const totalSellOrders = orders.filter(o => o.type === 'sell').length;
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Order History</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button className="btn btn-sm btn-outline-secondary">
              <i className="fas fa-download me-1"></i>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-primary">
                <div className="h2 mb-0">{orders.length}</div>
                <small className="text-muted">Total Orders</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-success">
                <div className="h2 mb-0">{totalBuyOrders}</div>
                <small className="text-muted">Buy Orders</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-danger">
                <div className="h2 mb-0">{totalSellOrders}</div>
                <small className="text-muted">Sell Orders</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-warning">
                <div className="h2 mb-0">₹{totalAmount.toLocaleString('en-IN')}</div>
                <small className="text-muted">Total Turnover</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search orders by symbol or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('all')}
                >
                  All Orders
                </button>
                <button
                  className={`btn btn-sm ${filter === 'buy' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilter('buy')}
                >
                  Buy Orders
                </button>
                <button
                  className={`btn btn-sm ${filter === 'sell' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFilter('sell')}
                >
                  Sell Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Orders</h5>
          <small className="text-muted">
            Showing {filteredOrders.length} of {orders.length} orders
          </small>
        </div>
        <div className="card-body p-0">
          {filteredOrders.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Date & Time</th>
                    <th>Type</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <small className="text-muted">#{order.id}</small>
                      </td>
                      <td>
                        <div className="small">
                          {new Date(order.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {new Date(order.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                      <td>{getTypeBadge(order.type)}</td>
                      <td>
                        <div>
                          <strong>{order.symbol}</strong>
                          <div className="small text-muted">{order.name}</div>
                        </div>
                      </td>
                      <td>{order.quantity}</td>
                      <td>₹{order.price.toFixed(2)}</td>
                      <td>
                        <strong>₹{order.total.toFixed(2)}</strong>
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <p className="text-muted">No orders found</p>
              {search && (
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setSearch('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;