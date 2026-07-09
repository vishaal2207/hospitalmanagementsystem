import React from 'react';
import { Link } from 'react-router-dom';

function AdminResourcesSection({ appointments = [], contacts = [] }) {
  return (
    <article className="admin-card" id="resources">
      <div className="admin-card-heading">
        <h3>Resources</h3>
        <Link to="/admin-dashboard/resources">Open section</Link>
      </div>
      <div className="resource-grid">
        <div><strong>Appointment records</strong><span>{appointments.length} total</span></div>
        <div><strong>Requested visits</strong><span>{appointments.filter((item) => (item.status || 'Requested') === 'Requested').length} open</span></div>
        <div><strong>Support messages</strong><span>{contacts.length} total</span></div>
        <div><strong>Open messages</strong><span>{contacts.filter((item) => (item.status || 'Open') === 'Open').length} open</span></div>
      </div>
    </article>
  );
}

export default AdminResourcesSection;
