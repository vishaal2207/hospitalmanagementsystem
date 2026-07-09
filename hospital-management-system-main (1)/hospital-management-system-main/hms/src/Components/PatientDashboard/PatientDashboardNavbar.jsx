import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { patientNavItems } from './patientDashboardData';

function PatientDashboardNavbar({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="dashboard-navbar">
      <Link className="dashboard-navbar-brand" to="/patient-dashboard" aria-label="Patient dashboard">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>
          <strong>MediCare</strong>
          <small>Patient Portal</small>
        </span>
      </Link>

      <nav className="dashboard-navbar-links" aria-label="Patient dashboard">
        {patientNavItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/patient-dashboard'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-navbar-actions">
        <button className="button button-ghost" type="button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default PatientDashboardNavbar;
