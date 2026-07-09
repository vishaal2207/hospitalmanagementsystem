import React from 'react';
import { Link } from 'react-router-dom';

function AdminStaffSection({ staffRoster }) {
  return (
    <article className="admin-card" id="staff">
      <div className="admin-card-heading">
        <h3>Staff management</h3>
        <Link to="/admin-dashboard/staff">Open section</Link>
      </div>
      <div className="staff-list">
        {staffRoster.map((staff) => (
          <div className="staff-row" key={staff.role}>
            <div>
              <strong>{staff.role}</strong>
              <span>{staff.shift}</span>
            </div>
            <b>{staff.coverage}</b>
            <p>{staff.note}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AdminStaffSection;
