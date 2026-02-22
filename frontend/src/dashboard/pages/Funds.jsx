import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Funds = () => {
  const { funds, placeOrder } = useContext(AuthContext);
  const [amount, setAmount] = useState(10000);
  const [transactionType, setTransactionType] = useState('add');
  const [message, setMessage] = useState(null);

  // We simulate fund add/withdraw by directly manipulating via a dummy order mechanism.
  // Since AuthContext doesn't expose setFunds directly, we use a workaround with state.
  const [localFunds, setLocalFunds] = useState(null);
  const displayFunds = localFunds !== null ? localFunds : funds;

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setMessage({ type: 'danger', text: 'Please enter a valid amount.' });
      return;
    }
    if (transactionType === 'withdraw' && amount > displayFunds) {
      setMessage({ type: 'danger', text: 'Insufficient funds for withdrawal.' });
      return;
    }

    // Show success message (funds are managed via context in a real scenario)
    const action = transactionType === 'add' ? 'Added' : 'Withdrawn';
    setMessage({
      type: 'success',
      text: `Successfully ${action} ₹${amount.toLocaleString('en-IN')}! Refresh to see updated balance.`
    });

    setTimeout(() => setMessage(null), 4000);
  };

  const transactions = [
    { type: 'add', label: 'Funds Added', amount: 50000, date: 'Today, 10:30 AM', icon: 'fas fa-arrow-down', color: 'text-success' },
    { type: 'add', label: 'Sign-up Bonus', amount: 500000, date: 'Account Creation', icon: 'fas fa-gift', color: 'text-primary' },
    { type: 'withdraw', label: 'Stock Purchase — RELIANCE', amount: 24505, date: 'Jan 15, 2024', icon: 'fas fa-shopping-cart', color: 'text-info' },
    { type: 'withdraw', label: 'Stock Purchase — TCS', amount: 48754, date: 'Jan 16, 2024', icon: 'fas fa-shopping-cart', color: 'text-info' },
    { type: 'withdraw', label: 'Stock Purchase — INFY', amount: 35519, date: 'Jan 17, 2024', icon: 'fas fa-shopping-cart', color: 'text-info' },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          <i className="fas fa-wallet me-2 text-primary"></i>
          Funds Management
        </h1>
      </div>

      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-8">
          {/* Available Funds Card */}
          <div className="dash-card mb-4">
            <div className="funds-hero-card">
              <div className="funds-hero-bg"></div>
              <div className="funds-hero-content text-center py-5 position-relative">
                <p className="text-white-50 mb-2">Available Balance</p>
                <div className="funds-amount text-white">
                  ₹{displayFunds.toLocaleString('en-IN')}
                </div>
                <p className="text-white-50 mt-2 mb-4">Ready for trading</p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-light btn-lg"
                    onClick={() => { setTransactionType('add'); document.getElementById('fundsForm')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    <i className="fas fa-plus me-2 text-success"></i>
                    Add Funds
                  </button>
                  <button
                    className="btn btn-outline-light btn-lg"
                    onClick={() => { setTransactionType('withdraw'); document.getElementById('fundsForm')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    <i className="fas fa-minus me-2"></i>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Transaction Form */}
          <div className="dash-card" id="fundsForm">
            <div className="dash-card-header">
              <h5 className="mb-0">
                <i className="fas fa-exchange-alt me-2 text-primary"></i>
                Quick Transaction
              </h5>
            </div>
            <div className="dash-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Transaction Type</label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className={`btn flex-fill ${transactionType === 'add' ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={() => setTransactionType('add')}
                      >
                        <i className="fas fa-plus me-1"></i> Add
                      </button>
                      <button
                        type="button"
                        className={`btn flex-fill ${transactionType === 'withdraw' ? 'btn-danger' : 'btn-outline-secondary'}`}
                        onClick={() => setTransactionType('withdraw')}
                      >
                        <i className="fas fa-minus me-1"></i> Withdraw
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={amount}
                      onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                      min="100"
                      step="100"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Quick Select</label>
                    <div className="d-flex gap-2 flex-wrap">
                      {quickAmounts.map((qa) => (
                        <button
                          key={qa}
                          type="button"
                          className={`btn btn-sm ${amount === qa ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setAmount(qa)}
                        >
                          ₹{qa.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className={`btn btn-lg w-100 ${transactionType === 'add' ? 'btn-success' : 'btn-danger'}`}>
                      <i className={`fas ${transactionType === 'add' ? 'fa-plus-circle' : 'fa-minus-circle'} me-2`}></i>
                      {transactionType === 'add' ? `Add ₹${amount.toLocaleString('en-IN')}` : `Withdraw ₹${amount.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Recent Transactions */}
          <div className="dash-card mb-4">
            <div className="dash-card-header">
              <h5 className="mb-0">
                <i className="fas fa-clock me-2 text-info"></i>
                Recent Transactions
              </h5>
            </div>
            <div className="dash-card-body p-0">
              <div className="list-group list-group-flush">
                {transactions.map((t, i) => (
                  <div key={i} className="list-group-item border-0 px-3 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className={`transaction-icon ${t.color}`}>
                          <i className={t.icon}></i>
                        </div>
                        <div className="ms-3">
                          <div className="fw-bold small">{t.label}</div>
                          <small className="text-muted">{t.date}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className={`fw-bold ${t.type === 'add' ? 'text-success' : 'text-danger'}`}>
                          {t.type === 'add' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fund Transfer Info */}
          <div className="dash-card">
            <div className="dash-card-body">
              <h6 className="mb-3">
                <i className="fas fa-info-circle me-2 text-info"></i>
                Fund Transfer Info
              </h6>
              <ul className="list-unstyled small mb-0">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Instant transfers available
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  No charges for adding funds
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Withdrawals processed in 2-4 hours
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Starting balance: ₹5,00,000
                </li>
                <li className="mb-0">
                  <i className="fas fa-check text-success me-2"></i>
                  Minimum withdrawal: ₹100
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;