import React from 'react';
import { Link } from 'react-router-dom';

function AdminDepartmentsSection({ departments }) {
  return (
    <article className="admin-card admin-card-wide" id="departments">
      <div className="admin-card-heading">
        <h3>Department load</h3>
        <Link to="/admin-dashboard/departments">Open section</Link>
      </div>
      <div className="department-list">
        {departments.map((department) => (
          <div className="department-row" key={department.name}>
            <div>
              <strong>{department.name}</strong>
              <span>{department.doctors} doctors - {department.patients} patients</span>
            </div>
            <div className="load-track" aria-label={`${department.name} load ${department.load}%`}>
              <span style={{ width: `${department.load}%` }}></span>
            </div>
            <em>{department.status}</em>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AdminDepartmentsSection;
