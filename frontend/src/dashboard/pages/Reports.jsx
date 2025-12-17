import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Reports = () => {
  const { getPortfolioStats, holdings, orders } = useContext(AuthContext);
  const stats = getPortfolioStats();

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Reports & Analytics</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button className="btn btn-sm btn-success me-2">
            <i className="fas fa-download me-1"></i>
            Download Report
          </button>
          <button className="btn btn-sm btn-primary">
            <i className="fas fa-print me-1"></i>
            Print
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-primary">
                <i className="fas fa-chart-pie fa-2x mb-2"></i>
                <div className="h4">{holdings.length}</div>
                <small>Total Holdings</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-success">
                <i className="fas fa-rupee-sign fa-2x mb-2"></i>
                <div className="h4">₹{stats.totalInvestment.toLocaleString('en-IN')}</div>
                <small>Total Investment</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="text-warning">
                <i className="fas fa-chart-line fa-2x mb-2"></i>
                <div className="h4">{stats.pnlPercentage.toFixed(2)}%</div>
                <small>Overall Returns</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Portfolio Summary</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>Total Investment</td>
                  <td className="text-end">₹{stats.totalInvestment.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Current Portfolio Value</td>
                  <td className="text-end">₹{stats.totalCurrentValue.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total P&L</td>
                  <td className={`text-end ${stats.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    ₹{stats.totalPnl.toFixed(2)} ({stats.pnlPercentage.toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td>Available Funds</td>
                  <td className="text-end text-primary">₹{stats.availableFunds.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total Orders</td>
                  <td className="text-end">{orders.length}</td>
                </tr>
                <tr>
                  <td>Total Turnover</td>
                  <td className="text-end">
                    ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;