import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  
  const userInfo = user ? (typeof user === 'string' ? JSON.parse(user) : user) : {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    accountNumber: 'RADHA123456',
    joinDate: '2024-01-01'
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Profile Settings</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          {isEditing ? (
            <button className="btn btn-sm btn-success me-2" onClick={handleSave}>
              <i className="fas fa-save me-1"></i>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-sm btn-primary me-2" onClick={() => setIsEditing(true)}>
              <i className="fas fa-edit me-1"></i>
              Edit Profile
            </button>
          )}
          <button className="btn btn-sm btn-outline-danger" onClick={logout}>
            <i className="fas fa-sign-out-alt me-1"></i>
            Logout
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center">
              <div className="mb-4">
                <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center" 
                     style={{ width: '120px', height: '120px' }}>
                  <i className="fas fa-user fa-3x text-white"></i>
                </div>
              </div>
              <h4>{userInfo.name}</h4>
              <p className="text-muted">{userInfo.email}</p>
              <div className="mt-4">
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-camera me-2"></i>
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="mb-3">Account Information</h6>
              <div className="mb-3">
                <small className="text-muted d-block">Account Number</small>
                <div className="fw-bold">{userInfo.accountNumber}</div>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Member Since</small>
                <div>{userInfo.joinDate}</div>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Account Status</small>
                <span className="badge bg-success">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-4">Personal Information</h5>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={userInfo.name}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={userInfo.email}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      defaultValue={userInfo.phone}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      defaultValue="1990-01-01"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      defaultValue="123 Main Street, Mumbai, Maharashtra 400001"
                      disabled={!isEditing}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;