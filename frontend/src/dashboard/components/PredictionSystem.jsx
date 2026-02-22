import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SENTIMENT_API = 'http://localhost:8000/sentiment';

// ─────────────────────────────────────────────────────
// Longest Increasing Subsequence — O(n²) DP
// ─────────────────────────────────────────────────────
function longestIncreasingSubsequence(prices) {
    const n = prices.length;
    if (n === 0) return { lisLength: 0, totalPrices: 0, growthRatio: 0, isGrowthPhase: false, subsequence: [] };

    const dp = new Array(n).fill(1);
    const parent = new Array(n).fill(-1);
    let maxLen = 1, maxIdx = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (prices[j] < prices[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > maxLen) { maxLen = dp[i]; maxIdx = i; }
    }

    const subsequence = [];
    let idx = maxIdx;
    while (idx !== -1) { subsequence.unshift(prices[idx]); idx = parent[idx]; }

    const growthRatio = maxLen / n;
    return {
        lisLength: maxLen,
        totalPrices: n,
        growthRatio: +growthRatio.toFixed(4),
        isGrowthPhase: growthRatio >= 0.6,
        subsequence,
    };
}

// Build a synthetic price history from holding data
function buildPriceHistory(holding) {
    const avg = holding.avgPrice || holding.avg || holding.currentPrice || 100;
    const current = holding.currentPrice || holding.price || avg;
    return [
        avg * 0.92, avg * 0.96, avg * 0.94, avg,
        avg * 1.02, avg * 0.98, avg * 1.04,
        current * 0.97, current * 0.99, current,
    ].map(p => +p.toFixed(2));
}

const PredictionSystem = () => {
    const { holdings } = useContext(AuthContext);

    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [userPrediction, setUserPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleVerify = async () => {
        if (!selectedSymbol || !userPrediction) {
            setError('Please select a stock and your prediction.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // ── Layer 2: AI Sentiment (async) ──
            let aiData = null;
            try {
                const res = await fetch(`${SENTIMENT_API}?symbol=${encodeURIComponent(selectedSymbol)}`);
                if (res.ok) aiData = await res.json();
            } catch { /* AI service unavailable — that's OK */ }

            // ── Layer 3: DSA Technical (runs locally — no backend needed) ──
            const holding = holdings.find(h => (h.symbol || h.name) === selectedSymbol);
            let techData = null;
            if (holding) {
                const priceHistory = buildPriceHistory(holding);
                const lisResult = longestIncreasingSubsequence(priceHistory);

                const avg = holding.avgPrice || holding.avg || 0;
                const current = holding.currentPrice || holding.price || 0;
                let priceVsAvg = 'neutral';
                if (current > avg * 1.02) priceVsAvg = 'above_avg';
                else if (current < avg * 0.98) priceVsAvg = 'below_avg';

                let technicalSignal = 'neutral';
                if (lisResult.isGrowthPhase && priceVsAvg === 'above_avg') technicalSignal = 'strong_growth';
                else if (lisResult.isGrowthPhase) technicalSignal = 'growth';
                else if (!lisResult.isGrowthPhase && priceVsAvg === 'below_avg') technicalSignal = 'decline';

                techData = { priceHistory, lisResult, priceVsAvg, technicalSignal };
            }

            // ── Map signals ──
            const aiSignal = aiData
                ? (aiData.sentiment === 'positive' ? 'bullish' : aiData.sentiment === 'negative' ? 'bearish' : 'neutral')
                : 'unavailable';

            const techSignal = techData
                ? (techData.technicalSignal.includes('growth') ? 'bullish' : techData.technicalSignal === 'decline' ? 'bearish' : 'neutral')
                : 'unavailable';

            // ── Confidence match ──
            const signals = [userPrediction, aiSignal, techSignal].filter(s => s !== 'unavailable' && s !== 'neutral');
            const bullishCount = signals.filter(s => s === 'bullish').length;
            const bearishCount = signals.filter(s => s === 'bearish').length;

            let confidence;
            if (signals.length === 0) {
                confidence = { level: 'neutral', label: 'Insufficient Data', color: '#6b7280' };
            } else if (bullishCount === signals.length || bearishCount === signals.length) {
                confidence = { level: 'high', label: 'High Confidence ✅', color: '#10b981' };
            } else if (bullishCount >= 2 || bearishCount >= 2) {
                confidence = { level: 'moderate', label: 'Moderate Match ⚡', color: '#f59e0b' };
            } else {
                confidence = { level: 'conflict', label: 'Trend Conflict ⚠️', color: '#ef4444' };
            }

            setResult({ userPrediction, ai: aiData, aiSignal, tech: techData, techSignal, confidence });
        } catch (err) {
            setError('Failed to verify prediction.');
        } finally {
            setLoading(false);
        }
    };

    const signalIcon = (signal) => {
        if (signal === 'bullish') return { icon: 'fa-arrow-trend-up', color: '#10b981', label: 'Bullish' };
        if (signal === 'bearish') return { icon: 'fa-arrow-trend-down', color: '#ef4444', label: 'Bearish' };
        if (signal === 'neutral') return { icon: 'fa-minus', color: '#6b7280', label: 'Neutral' };
        return { icon: 'fa-question', color: '#9ca3af', label: 'N/A' };
    };

    return (
        <div className="prediction-system mb-4">
            <div className="prediction-card">
                <div className="prediction-card-header">
                    <div className="prediction-title-group">
                        <div className="prediction-icon-badge">
                            <i className="fas fa-brain"></i>
                        </div>
                        <div>
                            <h5 className="mb-0 fw-bold">Comparison & Reality Check</h5>
                            <small className="text-muted">Compare your prediction against AI & technical analysis</small>
                        </div>
                    </div>
                </div>

                <div className="prediction-card-body">
                    {/* Input Row */}
                    <div className="row g-3 align-items-end mb-4">
                        <div className="col-md-4">
                            <label className="form-label fw-bold small text-uppercase">
                                <i className="fas fa-chart-bar me-1 text-primary"></i> Select Stock
                            </label>
                            <select
                                className="form-select form-select-lg prediction-select"
                                value={selectedSymbol}
                                onChange={(e) => { setSelectedSymbol(e.target.value); setResult(null); }}
                            >
                                <option value="">Choose from holdings...</option>
                                {holdings.map((h) => {
                                    const sym = h.symbol || h.name;
                                    return (
                                        <option key={sym} value={sym}>
                                            {sym} — ₹{h.currentPrice?.toFixed(2) || h.avgPrice?.toFixed(2)}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold small text-uppercase">
                                <i className="fas fa-user me-1 text-info"></i> Your Prediction
                            </label>
                            <div className="prediction-toggle-group">
                                <button
                                    className={`prediction-toggle-btn ${userPrediction === 'bullish' ? 'toggle-bullish-active' : ''}`}
                                    onClick={() => setUserPrediction('bullish')}
                                >
                                    <i className="fas fa-arrow-trend-up me-1"></i> Bullish
                                </button>
                                <button
                                    className={`prediction-toggle-btn ${userPrediction === 'bearish' ? 'toggle-bearish-active' : ''}`}
                                    onClick={() => setUserPrediction('bearish')}
                                >
                                    <i className="fas fa-arrow-trend-down me-1"></i> Bearish
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <button
                                className="btn btn-verify w-100"
                                onClick={handleVerify}
                                disabled={loading || !selectedSymbol || !userPrediction}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-search-dollar me-2"></i>
                                        Verify Prediction
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center">
                            <i className="fas fa-exclamation-triangle me-2"></i> {error}
                        </div>
                    )}

                    {/* Results */}
                    {result && (
                        <div className="prediction-results">
                            {/* Confidence Banner */}
                            <div className="confidence-banner" style={{ borderColor: result.confidence.color }}>
                                <div className="confidence-indicator" style={{ background: result.confidence.color }}></div>
                                <div>
                                    <h6 className="mb-0 fw-bold" style={{ color: result.confidence.color }}>
                                        {result.confidence.label}
                                    </h6>
                                    <small className="text-muted">
                                        {result.confidence.level === 'high'
                                            ? 'All signals align — your prediction matches AI & technical analysis!'
                                            : result.confidence.level === 'moderate'
                                                ? 'Most signals agree, but one source differs. Proceed with caution.'
                                                : result.confidence.level === 'conflict'
                                                    ? 'Signals conflict! Your prediction, AI, and technicals disagree. Review carefully.'
                                                    : 'Not enough data for a reliable comparison.'}
                                    </small>
                                </div>
                            </div>

                            {/* Three Signal Cards */}
                            <div className="row g-3 mt-2">
                                {/* User Prediction */}
                                <div className="col-md-4">
                                    <div className="signal-card">
                                        <div className="signal-card-header">
                                            <span className="signal-source-badge source-user">
                                                <i className="fas fa-user me-1"></i> YOU
                                            </span>
                                        </div>
                                        <div className="signal-body text-center py-3">
                                            <i className={`fas ${signalIcon(result.userPrediction).icon} signal-main-icon`}
                                                style={{ color: signalIcon(result.userPrediction).color }}></i>
                                            <h6 className="mt-2 fw-bold">{signalIcon(result.userPrediction).label}</h6>
                                            <small className="text-muted">Manual prediction</small>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Sentiment */}
                                <div className="col-md-4">
                                    <div className="signal-card">
                                        <div className="signal-card-header">
                                            <span className="signal-source-badge source-ai">
                                                <i className="fas fa-robot me-1"></i> AI
                                            </span>
                                        </div>
                                        <div className="signal-body text-center py-3">
                                            {result.ai ? (
                                                <>
                                                    <i className={`fas ${signalIcon(result.aiSignal).icon} signal-main-icon`}
                                                        style={{ color: signalIcon(result.aiSignal).color }}></i>
                                                    <h6 className="mt-2 fw-bold">{signalIcon(result.aiSignal).label}</h6>
                                                    <small className="text-muted">
                                                        {result.ai.sentiment} ({(result.ai.confidence * 100).toFixed(0)}% conf.)
                                                    </small>
                                                    <div className="mt-1">
                                                        <small className="text-muted fst-italic" style={{ fontSize: '0.7rem' }}>
                                                            &quot;{result.ai.headline?.substring(0, 60)}...&quot;
                                                        </small>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-exclamation-circle signal-main-icon text-muted"></i>
                                                    <h6 className="mt-2 fw-bold text-muted">Unavailable</h6>
                                                    <small className="text-muted">AI service not running</small>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Technical (LIS) */}
                                <div className="col-md-4">
                                    <div className="signal-card">
                                        <div className="signal-card-header">
                                            <span className="signal-source-badge source-dsa">
                                                <i className="fas fa-chart-line me-1"></i> DSA
                                            </span>
                                        </div>
                                        <div className="signal-body text-center py-3">
                                            {result.tech ? (
                                                <>
                                                    <i className={`fas ${signalIcon(result.techSignal).icon} signal-main-icon`}
                                                        style={{ color: signalIcon(result.techSignal).color }}></i>
                                                    <h6 className="mt-2 fw-bold">{signalIcon(result.techSignal).label}</h6>
                                                    <small className="text-muted">
                                                        LIS: {result.tech.lisResult.lisLength}/{result.tech.lisResult.totalPrices} prices
                                                        ({(result.tech.lisResult.growthRatio * 100).toFixed(0)}%)
                                                    </small>
                                                    <div className="mt-2">
                                                        <div className="progress" style={{ height: '6px' }}>
                                                            <div
                                                                className={`progress-bar ${result.tech.lisResult.isGrowthPhase ? 'bg-success' : 'bg-danger'}`}
                                                                style={{ width: `${result.tech.lisResult.growthRatio * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <small className="text-muted mt-1 d-block" style={{ fontSize: '0.7rem' }}>
                                                            {result.tech.lisResult.isGrowthPhase ? '✅ True Growth Phase' : '❌ Not in Growth Phase'}
                                                        </small>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-exclamation-circle signal-main-icon text-muted"></i>
                                                    <h6 className="mt-2 fw-bold text-muted">Unavailable</h6>
                                                    <small className="text-muted">No holding data</small>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Algorithm Info */}
                            {result.tech && (
                                <div className="algorithm-info mt-3">
                                    <small>
                                        <i className="fas fa-info-circle me-1 text-info"></i>
                                        <strong>Algorithm:</strong> Longest Increasing Subsequence (DP) —
                                        Time: O(n²), Space: O(n). Growth threshold: 60%.
                                        Price history: [{result.tech.priceHistory?.slice(0, 5).join(', ')}
                                        {result.tech.priceHistory?.length > 5 ? ', ...' : ''}]
                                    </small>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictionSystem;
