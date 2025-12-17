import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthContextProvider, AuthContext } from "./context/AuthContext";

// Import Navbar and Footer
import Navbar from "./Landing_page/Navbar";
import Footer from "./Landing_page/Footer";

// Import HomePage, Signup, and PricingPage
import HomePage from "./Landing_page/home/Homepage";
import Signup from "./Landing_page/signup/Signup";
import PricingPage from "./Landing_page/home/pricing";

// Lazy load other landing pages with error boundaries
const AboutPage = lazy(() => 
  import("./Landing_page/about/AboutPage").catch(() => ({
    default: () => (
      <div className="container py-5">
        <h1>About Us</h1>
        <p>Learn more about our company and mission.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    )
  }))
);

const SupportPage = lazy(() => 
  import("./Landing_page/support/SupportPage").catch(() => ({
    default: () => (
      <div className="container py-5">
        <h1>Support</h1>
        <p>Get help and support from our team.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    )
  }))
);

const ProductPage = lazy(() => 
  import("./Landing_page/product/ProductPage").catch(() => ({
    default: () => (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h4>Products Page Loading...</h4>
          <p>The products page is currently being loaded.</p>
          <a href="/" className="btn btn-primary mt-2">Go Home</a>
        </div>
      </div>
    )
  }))
);

// Lazy load Dashboard App
const DashboardApp = lazy(() => 
  import("./dashboard/App").catch(() => ({
    default: () => (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h4>Dashboard Loading...</h4>
          <p>The dashboard is currently being loaded.</p>
          <div className="mt-3">
            <a href="/" className="btn btn-primary me-2">Go Home</a>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => window.location.reload()}
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    )
  }))
);

// Loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div className="text-center">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading...</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5">
          <div className="alert alert-danger">
            <h4>Something went wrong</h4>
            <p>Please try refreshing the page or contact support.</p>
            <button 
              className="btn btn-primary mt-2"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppRoutes = () => {
  const { isLoggedIn, isInitialized } = useContext(AuthContext);
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // Show loading while auth initializes
  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-wrapper">
      {/* Show Navbar only on landing pages */}
      {!isDashboardRoute && (
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
      )}

      {/* Show logged in notice on public pages when logged in */}
      {isLoggedIn && !isDashboardRoute && (
        <div className="alert alert-success alert-dismissible fade show mb-0 rounded-0" role="alert">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="fas fa-check-circle me-2"></i>
                You are logged in! <a href="/dashboard" className="alert-link fw-bold">Go to Dashboard →</a>
              </span>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="alert" 
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={isDashboardRoute ? "dashboard-main" : "public-main"}>
        <ErrorBoundary>
          <Routes>
            {/* ===== LANDING PAGES ===== */}
            
            {/* Home */}
            <Route path="/" element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            } />
            
            {/* About */}
            <Route path="/about" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <AboutPage />
                </Suspense>
              </ErrorBoundary>
            } />
            
            {/* Pricing */}
            <Route path="/pricing" element={
              <ErrorBoundary>
                <PricingPage />
              </ErrorBoundary>
            } />
            
            {/* Support */}
            <Route path="/support" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <SupportPage />
                </Suspense>
              </ErrorBoundary>
            } />
            
            {/* Products - with redirect for typos */}
            <Route path="/product" element={<Navigate to="/products" replace />} />
            <Route path="/Product" element={<Navigate to="/products" replace />} />
            
            <Route path="/products" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductPage />
                </Suspense>
              </ErrorBoundary>
            } />
            
            {/* Signup - Redirect to dashboard if already logged in */}
            <Route path="/signup" element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <ErrorBoundary>
                  <Signup />
                </ErrorBoundary>
              )
            } />
            
            {/* ===== DASHBOARD ROUTES ===== */}
            
            {/* Dashboard - Protected Route */}
            <Route path="/dashboard/*" element={
              isLoggedIn ? (
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <DashboardApp />
                  </Suspense>
                </ErrorBoundary>
              ) : (
                <Navigate to="/" replace />
              )
            } />
            
            {/* ===== 404 PAGE ===== */}
            <Route path="*" element={
              <div className="container py-5 my-5">
                <div className="text-center">
                  <h1 className="display-1 text-muted">404</h1>
                  <h2 className="mb-4">Page Not Found</h2>
                  <p className="lead mb-4">
                    The page <code>{location.pathname}</code> doesn't exist.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <a href="/" className="btn btn-primary btn-lg">
                      <i className="fas fa-home me-2"></i>
                      Go Home
                    </a>
                    <a href="/products" className="btn btn-success btn-lg">
                      <i className="fas fa-box me-2"></i>
                      View Products
                    </a>
                    {isLoggedIn && (
                      <a href="/dashboard" className="btn btn-warning btn-lg">
                        <i className="fas fa-tachometer-alt me-2"></i>
                        Dashboard
                      </a>
                    )}
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </ErrorBoundary>
      </main>

      {/* Show Footer only on landing pages */}
      {!isDashboardRoute && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;