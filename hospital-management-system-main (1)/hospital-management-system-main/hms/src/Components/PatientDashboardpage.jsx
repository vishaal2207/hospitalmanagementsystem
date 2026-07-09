import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';
import PatientDashboardNavbar from './PatientDashboard/PatientDashboardNavbar';

function PatientDashboardpage() {
  const { logout } = useAuth();
  const session = storage.readSession(storageKeys.authSession, null);
  const userName = session ? `${session.firstName || ''} ${session.lastName || ''}`.trim() : 'Patient';
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    Promise.allSettled([api.getAppointments(), api.getContacts(), api.getDoctors(), api.getRecords()]).then(([appointmentsResult, contactsResult, doctorsResult, recordsResult]) => {
      if (appointmentsResult.status === 'fulfilled') setAppointments(appointmentsResult.value.data || []);
      if (contactsResult.status === 'fulfilled') setContacts(contactsResult.value.data || []);
      if (doctorsResult.status === 'fulfilled') setDoctors(doctorsResult.value.data || []);
      if (recordsResult.status === 'fulfilled') setRecords(recordsResult.value.data || []);
    });
  }, []);

  const patientMetrics = useMemo(() => ([
    { label: 'Upcoming visits', value: String(appointments.length), note: 'Appointment records', icon: 'UV' },
    { label: 'Requested', value: String(appointments.filter((item) => (item.status || 'Requested') === 'Requested').length), note: 'Waiting confirmation', icon: 'RQ' },
    { label: 'Messages', value: String(contacts.length), note: 'Support records', icon: 'MS' },
    { label: 'Confirmed', value: String(appointments.filter((item) => item.status === 'Confirmed').length), note: 'Approved visits', icon: 'CF' }
  ]), [appointments, contacts]);

  if (!session) return <Navigate to="/login" replace />;

  return (
    <main className="page admin-page">
      <div className="page-inner admin-page-inner">
        <PatientDashboardNavbar onLogout={logout} />
        <section className="doctor-dashboard">
          <section className="admin-hero doctor-hero">
            <div>
              <span className="admin-date">Patient portal</span>
              <h2>My health dashboard</h2>
              <p>Welcome, {userName || 'Patient'}. Manage appointments, doctors, medical records, billing, and support from one place.</p>
            </div>
            <div className="admin-hero-actions">
              <Link className="button" to="/patient-dashboard/appointments">View appointments</Link>
              <Link className="button-secondary" to="/patient-dashboard/records">Open records</Link>
            </div>
          </section>

          <section className="admin-metrics">
            {patientMetrics.map((metric) => (
              <article className="admin-metric" key={metric.label}>
                <span className="admin-metric-icon">{metric.icon}</span>
                <span className="dashboard-stat-label">{metric.label}</span>
                <strong className="dashboard-stat-value">{metric.value}</strong>
                <span className="dashboard-stat-note">{metric.note}</span>
              </article>
            ))}
          </section>

          <section className="doctor-overview-grid">
            <article className="admin-card admin-card-wide">
              <div className="admin-card-heading"><h3>Upcoming appointments</h3><Link to="/patient-dashboard/appointments">Open section</Link></div>
              <div className="admin-module-table">
                <div className="admin-module-table-head doctor-table-five"><span>Date</span><span>Time</span><span>Doctor</span><span>Department</span><span>Status</span></div>
                {appointments.map((item) => (
                  <div className="admin-module-table-row doctor-table-five" key={item._id}>
                    <span>{item.date}</span><span>{item.time || 'Not assigned'}</span><span>{item.doctor || 'Not assigned'}</span><span>{item.department}</span><span>{item.status || 'Requested'}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="admin-card">
              <div className="admin-card-heading"><h3>Care team</h3><Link to="/patient-dashboard/doctors">Open section</Link></div>
              {doctors.length === 0 ? (
                <p className="dashboard-stat-note">No doctors have been added yet.</p>
              ) : (
                <ul className="admin-compact-list">{doctors.map((doctor) => <li key={doctor._id || doctor.name}>{doctor.name} - {doctor.specialty}</li>)}</ul>
              )}
            </article>
            <article className="admin-card">
              <div className="admin-card-heading"><h3>Recent records</h3><Link to="/patient-dashboard/records">Open section</Link></div>
              {records.length === 0 ? (
                <p className="dashboard-stat-note">No records have been added yet.</p>
              ) : (
                <ul className="admin-compact-list">{records.map((record) => <li key={record._id || record.record}>{record.record} - {record.status}</li>)}</ul>
              )}
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

export default PatientDashboardpage;
