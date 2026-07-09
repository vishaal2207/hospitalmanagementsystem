import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';
import DoctorDashboardNavbar from './DoctorDashboard/DoctorDashboardNavbar';

function DoctorDashboardpage() {
  const { logout } = useAuth();
  const session = storage.readSession(storageKeys.authSession, null);
  const userName = session ? `${session.firstName || ''} ${session.lastName || ''}`.trim() : 'Doctor';
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    Promise.allSettled([api.getAppointments(), api.getRecords(), api.getBills()])
      .then(([appointmentsResult, recordsResult, billsResult]) => {
        if (appointmentsResult.status === 'fulfilled') setAppointments(appointmentsResult.value.data || []);
        if (recordsResult.status === 'fulfilled') setRecords(recordsResult.value.data || []);
        if (billsResult.status === 'fulfilled') setBills(billsResult.value.data || []);
      });
  }, []);

  const doctorMetrics = useMemo(() => ([
    { label: 'Today visits', value: String(appointments.length), note: 'Appointment records', icon: 'TV' },
    { label: 'Waiting patients', value: String(appointments.filter((item) => (item.status || 'Requested') === 'Requested').length), note: 'Requested visits', icon: 'WP' },
    { label: 'Confirmed', value: String(appointments.filter((item) => item.status === 'Confirmed').length), note: 'Approved appointments', icon: 'CF' },
    { label: 'Completed', value: String(appointments.filter((item) => item.status === 'Completed').length), note: 'Closed visits', icon: 'CL' }
  ]), [appointments]);

  const patientItems = appointments.map((item) => ({
    name: item.patientName || item.patient || 'Patient',
    condition: item.notes || item.department || 'Appointment request',
    priority: item.status || 'Requested'
  }));

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="page admin-page">
      <div className="page-inner admin-page-inner">
        <DoctorDashboardNavbar onLogout={logout} />

        <section className="doctor-dashboard">
          <section className="admin-hero doctor-hero">
            <div>
              <span className="admin-date">Clinical workflow</span>
              <h2>Doctor dashboard</h2>
              <p>Welcome, {userName || 'Doctor'}. Manage your schedule, patient panel, consultations, records, and reports from one clinical workspace.</p>
            </div>
            <div className="admin-hero-actions">
              <Link className="button" to="/doctor-dashboard/schedule">Start rounds</Link>
              <Link className="button-secondary" to="/doctor-dashboard/patients">View patients</Link>
            </div>
          </section>

          <section className="admin-metrics" aria-label="Doctor metrics">
            {doctorMetrics.map((metric) => (
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
              <div className="admin-card-heading">
                <h3>Today&apos;s schedule</h3>
                <Link to="/doctor-dashboard/schedule">Open section</Link>
              </div>
              <div className="admin-module-table">
                <div className="admin-module-table-head doctor-table-five">
                  <span>Time</span><span>Patient</span><span>Type</span><span>Room</span><span>Status</span>
                </div>
                {appointments.map((item) => (
                  <div className="admin-module-table-row doctor-table-five" key={item._id}>
                    <span>{item.time || item.date || 'Not set'}</span><span>{item.patientName || item.patient}</span><span>{item.notes || item.department}</span><span>{item.room || item.department}</span><span>{item.status || 'Requested'}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-card">
              <div className="admin-card-heading">
                <h3>Patient priorities</h3>
                <Link to="/doctor-dashboard/patients">Open section</Link>
              </div>
              <ul className="admin-compact-list">
                {patientItems.map((patient) => (
                  <li key={patient.name}>{patient.name} - {patient.condition} - {patient.priority}</li>
                ))}
              </ul>
            </article>

            <article className="admin-card">
              <div className="admin-card-heading">
                <h3>Records and reports</h3>
                <Link to="/doctor-dashboard/records">Open section</Link>
              </div>
              <div className="admin-lane-list">
                <div><strong>Medical records</strong><span>{records.length} shared</span></div>
                <div><strong>Reviewed records</strong><span>{records.filter((item) => item.status === 'Reviewed').length} reviewed</span></div>
                <div><strong>Billing records</strong><span>{bills.length} records</span></div>
                <div><strong>Unpaid bills</strong><span>{bills.filter((item) => item.status !== 'Paid').length} open</span></div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

export default DoctorDashboardpage;
