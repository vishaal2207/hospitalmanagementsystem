import React from 'react';
import { Link } from 'react-router-dom';

function AdminAlertsSection({ alerts }) {
  return (
    <article className="admin-card">
      <div className="admin-card-heading">
        <h3>Critical alerts</h3>
        <Link to="/admin-dashboard/resources">Open section</Link>
      </div>
      <ul className="admin-alert-list">
        {alerts.map((alert) => (
          <li key={alert.title}>
            <span>{alert.tag}</span>
            <p>{alert.title}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default AdminAlertsSection;
