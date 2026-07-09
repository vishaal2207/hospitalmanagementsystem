import React from 'react';
import { Link } from 'react-router-dom';

function AdminAppointmentsSection({ appointments }) {
  return (
    <article className="admin-card admin-card-wide" id="appointments">
      <div className="admin-card-heading">
        <h3>Appointment queue</h3>
        <Link to="/admin-dashboard/appointments">Open section</Link>
      </div>
      <div className="admin-table" role="table" aria-label="Appointment queue">
        <div className="admin-table-head" role="row">
          <span>Time</span>
          <span>Patient</span>
          <span>Doctor</span>
          <span>Department</span>
          <span>Status</span>
        </div>
        {appointments.map((appointment) => (
          <div className="admin-table-row" role="row" key={appointment._id || `${appointment.date}-${appointment.patientName}`}>
            <span>{appointment.time || appointment.date || 'TBD'}</span>
            <strong>{appointment.patientName || appointment.patient}</strong>
            <span>{appointment.doctor || 'Unassigned'}</span>
            <span>{appointment.department}</span>
            <em>{appointment.status || 'Requested'}</em>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AdminAppointmentsSection;
