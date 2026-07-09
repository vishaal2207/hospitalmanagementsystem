import React from 'react';
import { Link } from 'react-router-dom';

function AdminReportsSection({ reports }) {
  return (
    <article className="admin-card" id="reports">
      <div className="admin-card-heading">
        <h3>Reports</h3>
        <Link to="/admin-dashboard/reports">Open section</Link>
      </div>
      <ul className="dashboard-list report-list">
        {reports.map((report) => (
          <li key={report}>{report}</li>
        ))}
      </ul>
    </article>
  );
}

export default AdminReportsSection;
