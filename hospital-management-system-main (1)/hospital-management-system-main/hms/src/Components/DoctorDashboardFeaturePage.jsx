import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';
import DoctorDashboardNavbar from './DoctorDashboard/DoctorDashboardNavbar';
import { doctorFeaturePages } from './DoctorDashboard/doctorDashboardData';

function DoctorModuleTable({ columns, rows, renderActions }) {
  return (
    <div className="admin-module-table">
      <div className="admin-module-table-head" style={{ gridTemplateColumns: `repeat(${columns.length + (renderActions ? 1 : 0)}, minmax(130px, 1fr))` }}>
        {columns.map((column) => <span key={column}>{column}</span>)}
        {renderActions && <span>Actions</span>}
      </div>
      {rows.map((row) => (
        <div className="admin-module-table-row" style={{ gridTemplateColumns: `repeat(${columns.length + (renderActions ? 1 : 0)}, minmax(130px, 1fr))` }} key={row._id || Object.values(row).join('-')}>
          {columns.map((column) => <span key={column}>{row[column]}</span>)}
          {renderActions && <span>{renderActions(row)}</span>}
        </div>
      ))}
    </div>
  );
}

function ScheduleModule({ appointments, onUpdateAppointment, onDeleteAppointment }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: '', time: '', doctor: '', room: '', status: 'Requested' });

  function startEdit(appointment) {
    setEditingId(appointment._id);
    setForm({
      date: appointment.date || '',
      time: appointment.time || '',
      doctor: appointment.doctor || '',
      room: appointment.room || '',
      status: appointment.status || 'Requested'
    });
  }

  async function saveEdit(id) {
    await onUpdateAppointment(id, form);
    setEditingId(null);
  }

  return (
    <section className="admin-module-layout">
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Appointment schedule</h3><span>{appointments.length} requests</span></div>
        {appointments.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No appointment requests found.</p>
        ) : (
          <div className="admin-module-table">
            <div className="admin-module-table-head" style={{ gridTemplateColumns: 'repeat(8, minmax(130px, 1fr))' }}>
              <span>Date</span><span>Time</span><span>Patient</span><span>Doctor</span><span>Room</span><span>Department</span><span>Status</span><span>Actions</span>
            </div>
            {appointments.map((item) => {
              const isEditing = editingId === item._id;
              return (
                <div className="admin-module-table-row" style={{ gridTemplateColumns: 'repeat(8, minmax(130px, 1fr))' }} key={item._id}>
                  {isEditing ? (
                    <>
                      <span><input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} style={{ width: '100%' }} /></span>
                      <span><input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} style={{ width: '100%' }} /></span>
                      <span>{item.patientName || item.patient || 'Patient'}</span>
                      <span><input value={form.doctor} onChange={(event) => setForm({ ...form, doctor: event.target.value })} placeholder="Doctor name" style={{ width: '100%' }} /></span>
                      <span><input value={form.room} onChange={(event) => setForm({ ...form, room: event.target.value })} placeholder="Room" style={{ width: '100%' }} /></span>
                      <span>{item.department || 'Not set'}</span>
                      <span>
                        <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={{ width: '100%' }}>
                          <option>Requested</option>
                          <option>Confirmed</option>
                          <option>Checked in</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </span>
                      <span className="admin-action-row">
                        <button type="button" onClick={() => saveEdit(item._id)}>Save</button>
                        <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{item.date || 'Not assigned'}</span>
                      <span>{item.time || 'Not assigned'}</span>
                      <span>{item.patientName || item.patient || 'Patient'}</span>
                      <span>{item.doctor || 'Not assigned'}</span>
                      <span>{item.room || 'Not assigned'}</span>
                      <span>{item.department || 'Not set'}</span>
                      <span>{item.status || 'Requested'}</span>
                      <span className="admin-action-row">
                        <button type="button" onClick={() => startEdit(item)}>Assign</button>
                        <button type="button" onClick={() => onUpdateAppointment(item._id, { status: 'Confirmed' })}>Accept</button>
                        <button type="button" onClick={() => onUpdateAppointment(item._id, { status: 'Cancelled' })}>Cancel</button>
                        <button type="button" onClick={() => onDeleteAppointment(item._id)} style={{ color: 'crimson' }}>Delete</button>
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </article>
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Visit status</h3><span>Live flow</span></div>
        <div className="admin-lane-list">
          <div><strong>Requested</strong><span>{appointments.filter((item) => (item.status || 'Requested') === 'Requested').length} patients</span></div>
          <div><strong>Confirmed</strong><span>{appointments.filter((item) => item.status === 'Confirmed').length} patients</span></div>
          <div><strong>Checked in</strong><span>{appointments.filter((item) => item.status === 'Checked in').length} patients</span></div>
          <div><strong>Completed</strong><span>{appointments.filter((item) => item.status === 'Completed').length} visits</span></div>
          <div><strong>Cancelled</strong><span>{appointments.filter((item) => item.status === 'Cancelled').length} visits</span></div>
        </div>
      </article>
    </section>
  );
}

function PatientsModule({ appointments }) {
  return (
    <section className="admin-module-layout">
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Assigned patient panel</h3><span>Clinical list</span></div>
        <DoctorModuleTable columns={['Name', 'Phone', 'Condition', 'Priority', 'Visit date', 'Next step']} rows={appointments.map((item) => ({
          Name: item.patientName || item.patient,
          Phone: item.phone || 'Not provided',
          Condition: item.notes || item.department,
          Priority: item.status || 'Requested',
          'Visit date': item.date || 'Not set',
          'Next step': item.status === 'Confirmed' ? 'Prepare consultation' : 'Await confirmation'
        }))} />
      </article>
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Priority follow-ups</h3><span>Care plan</span></div>
        <ul className="admin-compact-list">
          {appointments.slice(0, 4).map((item) => <li key={item._id}>{item.patientName || item.patient} - {item.notes || item.department}</li>)}
        </ul>
      </article>
    </section>
  );
}

function ConsultationsModule({ appointments, onUpdateAppointment }) {
  const activeVisits = appointments.filter((item) => ['Confirmed', 'Checked in'].includes(item.status));
  return (
    <section className="admin-module-layout">
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Consultation workspace</h3><span>{activeVisits.length} active visits</span></div>
        <DoctorModuleTable
          columns={['Patient', 'Department', 'Date', 'Time', 'Room', 'Status', 'Notes']}
          rows={activeVisits.map((item) => ({
            _id: item._id,
            Patient: item.patientName || item.patient || 'Patient',
            Department: item.department || 'Not set',
            Date: item.date || 'Not assigned',
            Time: item.time || 'Not assigned',
            Room: item.room || 'Not assigned',
            Status: item.status || 'Requested',
            Notes: item.notes || 'No notes'
          }))}
          renderActions={(row) => (
            <span className="admin-action-row">
              <button type="button" onClick={() => onUpdateAppointment(row._id, { status: 'Checked in' })}>Check in</button>
              <button type="button" onClick={() => onUpdateAppointment(row._id, { status: 'Completed' })}>Complete</button>
            </span>
          )}
        />
      </article>
    </section>
  );
}

function RecordsModule({ appointments, records }) {
  return (
    <section className="admin-module-layout">
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Medical record review</h3><span>History</span></div>
        <DoctorModuleTable columns={['Patient', 'Record', 'Result', 'Flag', 'Action']} rows={[
          ...records.map((item) => ({ Patient: item.patientName || 'Patient portal', Record: item.record, Result: item.note, Flag: item.status, Action: 'Review record' })),
          ...appointments.map((item) => ({ Patient: item.patientName || item.patient, Record: 'Appointment note', Result: item.notes || item.department, Flag: item.status || 'Requested', Action: 'Review during visit' }))
        ]} />
      </article>
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Record categories</h3><span>Live counts</span></div>
        <div className="admin-lane-list">
          <div><strong>Shared records</strong><span>{records.length}</span></div>
          <div><strong>Appointment notes</strong><span>{appointments.length}</span></div>
          <div><strong>Reviewed</strong><span>{records.filter((item) => item.status === 'Reviewed').length}</span></div>
          <div><strong>Pending review</strong><span>{records.filter((item) => item.status !== 'Reviewed').length}</span></div>
        </div>
      </article>
    </section>
  );
}

function ReportsModule({ appointments, records, bills }) {
  return (
    <section className="admin-module-layout">
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Clinical performance reports</h3><span>Analytics</span></div>
        <DoctorModuleTable columns={['Report', 'Metric', 'Current', 'Target']} rows={[
          { Report: 'OPD completion', Metric: 'Visits completed', Current: String(appointments.filter((item) => item.status === 'Completed').length), Target: String(appointments.length) },
          { Report: 'Confirmed visits', Metric: 'Approved appointments', Current: String(appointments.filter((item) => item.status === 'Confirmed').length), Target: String(appointments.length) },
          { Report: 'Pending requests', Metric: 'Awaiting action', Current: String(appointments.filter((item) => (item.status || 'Requested') === 'Requested').length), Target: '0' },
          { Report: 'Medical records', Metric: 'Shared records', Current: String(records.length), Target: 'Live' },
          { Report: 'Billing records', Metric: 'Patient bills', Current: String(bills.length), Target: 'Live' }
        ]} />
      </article>
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Report counts</h3><span>Live records</span></div>
        <div className="admin-lane-list">
          <div><strong>Appointments</strong><span>{appointments.length}</span></div>
          <div><strong>Records</strong><span>{records.length}</span></div>
          <div><strong>Bills</strong><span>{bills.length}</span></div>
          <div><strong>Completed visits</strong><span>{appointments.filter((item) => item.status === 'Completed').length}</span></div>
        </div>
      </article>
    </section>
  );
}

function DoctorFeatureModule({ feature, appointments, records, bills, onUpdateAppointment, onDeleteAppointment }) {
  if (feature === 'schedule') return <ScheduleModule appointments={appointments} onUpdateAppointment={onUpdateAppointment} onDeleteAppointment={onDeleteAppointment} />;
  if (feature === 'patients') return <PatientsModule appointments={appointments} />;
  if (feature === 'consultations') return <ConsultationsModule appointments={appointments} onUpdateAppointment={onUpdateAppointment} />;
  if (feature === 'records') return <RecordsModule appointments={appointments} records={records} />;
  if (feature === 'reports') return <ReportsModule appointments={appointments} records={records} bills={bills} />;
  return null;
}

function DoctorDashboardFeaturePage() {
  const { feature } = useParams();
  const { logout } = useAuth();
  const session = storage.readSession(storageKeys.authSession, null);
  const page = doctorFeaturePages[feature];
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [bills, setBills] = useState([]);

  function loadData() {
    Promise.allSettled([api.getAppointments(), api.getRecords(), api.getBills()]).then(([appointmentsResult, recordsResult, billsResult]) => {
      if (appointmentsResult.status === 'fulfilled') setAppointments(appointmentsResult.value.data || []);
      if (recordsResult.status === 'fulfilled') setRecords(recordsResult.value.data || []);
      if (billsResult.status === 'fulfilled') setBills(billsResult.value.data || []);
    });
  }

  useEffect(() => { loadData(); }, []);

  async function handleUpdateAppointment(id, data) {
    await api.updateAppointment(id, data);
    loadData();
  }

  async function handleDeleteAppointment(id) {
    await api.deleteAppointment(id);
    loadData();
  }

  const liveStats = useMemo(() => ([
    { label: 'Appointments', value: String(appointments.length), note: 'Total records' },
    { label: 'Requested', value: String(appointments.filter((item) => (item.status || 'Requested') === 'Requested').length), note: 'Waiting confirmation' },
    { label: 'Confirmed', value: String(appointments.filter((item) => item.status === 'Confirmed').length), note: 'Approved visits' },
    { label: 'Completed', value: String(appointments.filter((item) => item.status === 'Completed').length), note: 'Closed visits' }
  ]), [appointments]);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!page) {
    return <Navigate to="/doctor-dashboard" replace />;
  }

  return (
    <main className="page admin-page">
      <div className="page-inner admin-page-inner">
        <DoctorDashboardNavbar onLogout={logout} />

        <section className="admin-feature-page" aria-labelledby="doctor-feature-title">
          <div className="admin-feature-hero doctor-hero">
            <div>
              <span className="admin-date">{page.kicker}</span>
              <h1 id="doctor-feature-title">{page.title}</h1>
              <p>{page.summary}</p>
            </div>
            <Link className="button-secondary" to="/doctor-dashboard">Back to overview</Link>
          </div>

          <section className="admin-feature-stats" aria-label={`${page.title} key stats`}>
            {liveStats.map((stat) => (
              <article className="admin-metric" key={stat.label}>
                <span className="admin-metric-icon">{stat.label.slice(0, 2).toUpperCase()}</span>
                <span className="dashboard-stat-label">{stat.label}</span>
                <strong className="dashboard-stat-value">{stat.value}</strong>
                <span className="dashboard-stat-note">{stat.note}</span>
              </article>
            ))}
          </section>

          <DoctorFeatureModule
            feature={feature}
            appointments={appointments}
            records={records}
            bills={bills}
            onUpdateAppointment={handleUpdateAppointment}
            onDeleteAppointment={handleDeleteAppointment}
          />
        </section>
      </div>
    </main>
  );
}

export default DoctorDashboardFeaturePage;
