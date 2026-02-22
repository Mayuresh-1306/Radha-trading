import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PredictionSystem from '../components/PredictionSystem';

// ── Detect viewport < 768px ──
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 0.02}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

// ── Sentiment badge component ──
const SentimentBadge = ({ sentiment, loading }) => {
  if (loading) {
    return <span className="sentiment-badge sentiment-loading ms-2">Loading…</span>;
  }
  if (!sentiment) {
    return <span className="sentiment-badge sentiment-loading ms-2">N/A</span>;
  }

  const map = {
    positive: { cls: 'sentiment-positive', icon: 'fa-arrow-trend-up', label: 'Positive' },
    neutral: { cls: 'sentiment-neutral', icon: 'fa-minus', label: 'Neutral' },
    negative: { cls: 'sentiment-negative', icon: 'fa-arrow-trend-down', label: 'Negative' },
  };
  const s = map[sentiment] || map.neutral;

  return (
    <span className={`sentiment-badge ${s.cls} ms-2`}>
      <i className={`fas ${s.icon} me-1`}></i>{s.label}
    </span>
  );
};

const Holdings = () => {
  const { holdings, getPortfolioStats } = useContext(AuthContext);
  const stats = getPortfolioStats();
  const isMobile = useIsMobile();

  // ── AI Sentiment state ──
  const [sentiments, setSentiments] = useState({});
  const [sentimentLoading, setSentimentLoading] = useState({});

  useEffect(() => {
    if (!holdings || holdings.length === 0) return;

    const SENTIMENT_API = 'http://localhost:8000/sentiment';

    holdings.forEach((h) => {
      const symbol = h.symbol || h.name;
      if (sentiments[symbol] !== undefined) return; // already fetched

      setSentimentLoading((prev) => ({ ...prev, [symbol]: true }));

      fetch(`${SENTIMENT_API}?symbol=${encodeURIComponent(symbol)}`)
        .then((res) => res.ok ? res.json() : Promise.reject())
        .then((data) => {
          setSentiments((prev) => ({ ...prev, [symbol]: data.sentiment }));
        })
        .catch(() => {
          setSentiments((prev) => ({ ...prev, [symbol]: null }));
        })
        .finally(() => {
          setSentimentLoading((prev) => ({ ...prev, [symbol]: false }));
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdings]);

  // ── Mobile Card View ──
  const renderCardView = () => (
    <div className="row g-3">
      {holdings.map((holding) => {
        const allocation = (holding.currentValue / stats.totalCurrentValue) * 100;
        const sym = holding.symbol || holding.name;
        return (
          <div className="col-12" key={sym}>
            <div className="card holdings-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <strong className="fs-6">{sym}</strong>
                  <SentimentBadge
                    sentiment={sentiments[sym]}
                    loading={sentimentLoading[sym]}
                  />
                  <div className="small opacity-75 mt-1">{holding.name}</div>
                </div>
                <span className={`badge ${holding.pnl >= 0 ? 'bg-success' : 'bg-danger'}`}>
                  {holding.pnl >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(2)}%
                </span>
              </div>
              <div className="card-body">
                <div className="metric-grid">
                  <div className="metric-item">
                    <div className="metric-label">Qty</div>
                    <div className="metric-value">{holding.quantity}</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Avg Price</div>
                    <div className="metric-value">₹{holding.avgPrice.toFixed(2)}</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Current</div>
                    <div className="metric-value">₹{holding.currentPrice.toFixed(2)}</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">P&L</div>
                    <div className={`metric-value ${holding.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      ₹{holding.pnl.toFixed(2)}
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Investment</div>
                    <div className="metric-value">₹{holding.investment.toFixed(2)}</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Allocation</div>
                    <div className="metric-value">{allocation.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Desktop Table View ──
  const renderTableView = () => (
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
                  const sym = holding.symbol || holding.name;
                  return (
                    <tr key={sym}>
                      <td>
                        <div>
                          <strong>{sym}</strong>
                          <SentimentBadge
                            sentiment={sentiments[sym]}
                            loading={sentimentLoading[sym]}
                          />
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
  );

  return (
    <div>
      {/* Prediction System at the top */}
      <PredictionSystem />

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
        <div className="col-md-4 mb-3 mb-md-0">
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
        <div className="col-md-4 mb-3 mb-md-0">
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

      {/* Responsive View Toggle */}
      {holdings.length > 0 ? (
        isMobile ? renderCardView() : renderTableView()
      ) : (
        renderTableView() /* Shows the "no holdings" empty state */
      )}
    </div>
  );
};

export default Holdings;