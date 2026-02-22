import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, logout, getPortfolioStats, funds } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userInfo = user ? (typeof user === 'string' ? JSON.parse(user) : user) : null;
  const stats = getPortfolioStats();
  const userName = userInfo?.name || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const menuItems = [
    { path: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Overview' },
    { path: '/dashboard/portfolio', icon: 'fas fa-chart-line', label: 'Portfolio' },
    { path: '/dashboard/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/dashboard/holdings', icon: 'fas fa-landmark', label: 'Holdings' },
    { path: '/dashboard/funds', icon: 'fas fa-wallet', label: 'Funds' },
    { path: '/dashboard/reports', icon: 'fas fa-file-alt', label: 'Reports' },
    { path: '/dashboard/profile', icon: 'fas fa-user-cog', label: 'Profile' },
  ];

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-container">
      {/* ── Premium Top Navigation Bar ── */}
      <nav className="dash-topbar">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* Hamburger — mobile only */}
            <button
              className="btn btn-topbar-toggle d-md-none me-2"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            <Link className="dash-brand" to="/dashboard">
              <div className="brand-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <span className="brand-text">Radha Trading</span>
            </Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Funds quick display */}
            <div className="topbar-funds d-none d-md-flex">
              <i className="fas fa-wallet me-2"></i>
              <span>₹{funds.toLocaleString('en-IN')}</span>
            </div>

            {/* Market status */}
            <div className="topbar-market-status d-none d-lg-flex">
              <div className="market-dot"></div>
              <span>Market Open</span>
            </div>

            {/* User Dropdown */}
            <div className="dropdown">
              <button
                className="btn dash-user-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <div className="user-avatar-circle">
                  {userInitials}
                </div>
                <span className="d-none d-sm-inline ms-2">{userName}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end dash-dropdown">
                <li>
                  <div className="dropdown-item-text">
                    <small className="text-muted">Account No.</small>
                    <div className="fw-bold">{userInfo?.accountNumber || 'RADHA789012'}</div>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/profile">
                    <i className="fas fa-user me-2"></i> Profile Settings
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/')}>
                    <i className="fas fa-home me-2"></i> Back to Home
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={logout}>
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Sidebar backdrop (mobile only) ── */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className="container-fluid">
        <div className="row">
          {/* ── Premium Sidebar ── */}
          <div className={`col-lg-2 col-md-3 dash-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li className="nav-item mb-1" key={item.path}>
                      <Link
                        className={`dash-nav-link ${isActive ? 'active' : ''}`}
                        to={item.path}
                        onClick={closeSidebar}
                      >
                        {isActive && <div className="nav-active-indicator"></div>}
                        <i className={`${item.icon} nav-icon`}></i>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Stats in Sidebar */}
              <div className="sidebar-stats-card mt-4">
                <h6 className="stats-card-title">
                  <i className="fas fa-chart-pie me-2"></i>Quick Stats
                </h6>
                <div className="stat-row">
                  <small>Portfolio Value</small>
                  <div className="stat-value text-success">
                    ₹{stats.totalCurrentValue.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="stat-row">
                  <small>Today's P&L</small>
                  <div className={`stat-value ${stats.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    {stats.totalPnl >= 0 ? '+' : ''}₹{stats.totalPnl.toFixed(2)}
                  </div>
                </div>
                <div className="stat-row">
                  <small>Available Funds</small>
                  <div className="stat-value">₹{stats.availableFunds.toLocaleString('en-IN')}</div>
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