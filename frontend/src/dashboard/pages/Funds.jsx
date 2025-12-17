import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Funds = () => {
  const { funds } = useContext(AuthContext);
  const [amount, setAmount] = useState(1000);
  const [transactionType, setTransactionType] = useState('add');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${transactionType === 'add' ? 'Adding' : 'Withdrawing'} ₹${amount} from funds`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Funds Management</h1>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="fas fa-wallet me-2 text-primary"></i>
                Available Funds
              </h5>
            </div>
            <div className="card-body text-center py-5">
              <div className="display-1 fw-bold text-success mb-3">
                ₹{funds.toLocaleString('en-IN')}
              </div>
              <p className="text-muted">Ready for trading</p>
              <div className="mt-4">
                <button className="btn btn-success me-2">
                  <i className="fas fa-plus me-1"></i>
                  Add Funds
                </button>
                <button className="btn btn-outline-danger">
                  <i className="fas fa-minus me-1"></i>
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Quick Transaction</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Transaction Type</label>
                    <select 
                      className="form-select"
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                    >
                      <option value="add">Add Funds</option>
                      <option value="withdraw">Withdraw Funds</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                      min="100"
                      step="100"
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      {transactionType === 'add' ? 'Add Funds' : 'Withdraw Funds'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Transactions</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0 py-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <i className="fas fa-arrow-down text-success me-2"></i>
                      <span>Funds Added</span>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-success">+₹5,000</div>
                      <small className="text-muted">Today, 10:30 AM</small>
                    </div>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0 py-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <i className="fas fa-arrow-up text-danger me-2"></i>
                      <span>Withdrawal</span>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-danger">-₹2,500</div>
                      <small className="text-muted">Yesterday, 3:45 PM</small>
                    </div>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0 py-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <i className="fas fa-shopping-cart text-info me-2"></i>
                      <span>Stock Purchase</span>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-info">-₹24,505</div>
                      <small className="text-muted">Jan 15, 2024</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="mb-3">
                <i className="fas fa-info-circle me-2 text-info"></i>
                Fund Transfer Info
              </h6>
              <ul className="list-unstyled small">
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