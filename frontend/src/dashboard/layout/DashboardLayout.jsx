import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LiveUpdate from '../components/LiveUpdate';

const DashboardLayout = ({ children }) => {
  const { user, logout, getPortfolioStats } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const userInfo = user ? (typeof user === 'string' ? JSON.parse(user) : user) : null;
  const stats = getPortfolioStats();

  const menuItems = [
    { path: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Overview' },
    { path: '/dashboard/portfolio', icon: 'fas fa-chart-line', label: 'Portfolio' },
    { path: '/dashboard/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/dashboard/holdings', icon: 'fas fa-landmark', label: 'Holdings' },
    { path: '/dashboard/funds', icon: 'fas fa-wallet', label: 'Funds' },
    { path: '/dashboard/reports', icon: 'fas fa-file-alt', label: 'Reports' },
    { path: '/dashboard/profile', icon: 'fas fa-user-cog', label: 'Profile' },
  ];

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <i className="fas fa-tachometer-alt me-2"></i>
            Trading Dashboard
          </Link>
          
          <div className="d-flex align-items-center">
            <LiveUpdate />
            {/* User Info */}
            <div className="dropdown ms-3">
              <button 
                className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '30px', height: '30px' }}>
                  <i className="fas fa-user text-white"></i>
                </div>
                <span>{userInfo?.name || 'User'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="dropdown-item-text">
                    <small className="text-muted">Account No.</small>
                    <div className="fw-bold">{userInfo?.accountNumber || 'RADHA789012'}</div>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/profile">
                    <i className="fas fa-user me-2"></i>
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/')}>
                    <i className="fas fa-home me-2"></i>
                    Back to Home
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={logout}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 col-md-3 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                {menuItems.map((item) => (
                  <li className="nav-item mb-2" key={item.path}>
                    <Link
                      className={`nav-link d-flex align-items-center ${
                        location.pathname === item.path ? 'active' : ''
                      }`}
                      to={item.path}
                    >
                      <i className={`${item.icon} me-3`}></i>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Stats in Sidebar */}
              <div className="mt-5 p-3 bg-white rounded shadow-sm">
                <h6 className="text-muted mb-3">Quick Stats</h6>
                <div className="mb-2">
                  <small className="text-muted">Portfolio Value</small>
                  <div className="h5 fw-bold text-success">₹{stats.totalCurrentValue.toLocaleString('en-IN')}</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Today's P&L</small>
                  <div className="h6 fw-bold text-primary">₹{stats.totalPnl.toFixed(2)}</div>
                </div>
                <div className="mb-0">
                  <small className="text-muted">Available Funds</small>
                  <div className="h6 fw-bold">₹{stats.availableFunds.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="col-lg-10 col-md-9 ms-sm-auto px-4 py-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;