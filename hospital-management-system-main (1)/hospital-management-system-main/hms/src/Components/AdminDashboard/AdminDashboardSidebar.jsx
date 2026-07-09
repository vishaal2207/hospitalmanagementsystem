import React from 'react';
import { NavLink } from 'react-router-dom';
import { adminNavItems } from './adminDashboardData';

function AdminDashboardSidebar({ userName }) {
  return (
    <aside className="admin-sidebar" aria-label="Admin sections">
      <div>
        <div className="kicker">Hospital operations</div>
        <h1 id="admin-dashboard-title">Admin dashboard</h1>
        <p>Welcome back, {userName || 'Hospital Admin'}. Monitor patient flow, staff coverage, finance, inventory, and reports from one command view.</p>
      </div>

      <nav className="admin-menu">
        {adminNavItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/admin-dashboard'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-card">
        <span>Next admin huddle</span>
        <strong>02:30 PM</strong>
        <p>Review emergency load, pending approvals, and night shift coverage.</p>
      </div>
    </aside>
  );
}

export default AdminDashboardSidebar;
