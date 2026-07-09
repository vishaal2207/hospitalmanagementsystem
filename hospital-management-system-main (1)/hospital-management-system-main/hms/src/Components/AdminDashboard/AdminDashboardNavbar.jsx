import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { adminNavItems } from './adminDashboardData';

function AdminDashboardNavbar({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="dashboard-navbar">
      <Link className="dashboard-navbar-brand" to="/" aria-label="MediCare home">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>
          <strong>MediCare</strong>
          <small>Admin Console</small>
        </span>
      </Link>

      <nav className="dashboard-navbar-links" aria-label="Dashboard">
        {adminNavItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/admin-dashboard'}>
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

export default AdminDashboardNavbar;
