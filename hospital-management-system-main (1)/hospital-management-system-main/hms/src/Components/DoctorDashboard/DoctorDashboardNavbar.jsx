import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { doctorNavItems } from './doctorDashboardData';

function DoctorDashboardNavbar({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="dashboard-navbar doctor-navbar">
      <Link className="dashboard-navbar-brand" to="/doctor-dashboard" aria-label="Doctor dashboard">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>
          <strong>MediCare</strong>
          <small>Doctor Console</small>
        </span>
      </Link>

      <nav className="dashboard-navbar-links" aria-label="Doctor dashboard">
        {doctorNavItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/doctor-dashboard'}>
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

export default DoctorDashboardNavbar;
