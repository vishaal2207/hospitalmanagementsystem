import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';
import PatientDashboardNavbar from './PatientDashboard/PatientDashboardNavbar';
import { patientFeaturePages } from './PatientDashboard/patientDashboardData';

function PatientTable({ columns, rows, renderActions }) {
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

function PatientFeatureModule({
  feature,
  appointments,
  contacts,
  doctors,
  records,
  bills,
  session,
  onCreateAppointment,
  onCreateDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  onCreateRecord,
  onUpdateRecord,
  onDeleteRecord,
  onCreateBill,
  onUpdateBill,
  onDeleteBill,
  onCreateContact,
  onUpdateContact,
  onDeleteContact
}) {
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: `${session?.firstName || ''} ${session?.lastName || ''}`.trim(),
    phone: '',
    department: '',
    date: '',
    notes: ''
  });
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialty: '',
    role: '',
    credentials: '',
    badge: '',
    nextSlot: '',
    contact: '',
    imageUrl: ''
  });
  const [recordForm, setRecordForm] = useState({ record: '', date: '', status: 'Ready', note: '' });
  const [billForm, setBillForm] = useState({ invoice: '', service: '', amount: '', status: 'Due' });
  const [supportForm, setSupportForm] = useState({ name: `${session?.firstName || ''} ${session?.lastName || ''}`.trim(), email: session?.email || '', subject: '', message: '' });

  if (feature === 'appointments') {
    return (
      <section className="admin-module-layout">
        <article className="admin-card">
          <div className="admin-card-heading"><h3>Request appointment</h3><span>Create</span></div>
          <form
            className="admin-crud-form"
            onSubmit={(event) => {
              event.preventDefault();
              onCreateAppointment(appointmentForm);
              setAppointmentForm({
                patientName: `${session?.firstName || ''} ${session?.lastName || ''}`.trim(),
                phone: '',
                department: '',
                date: '',
                notes: ''
              });
            }}
          >
            <input
              value={appointmentForm.patientName}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, patientName: event.target.value })}
              placeholder="Patient name"
              required
            />
            <input
              value={appointmentForm.phone}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, phone: event.target.value })}
              placeholder="Phone number"
              required
            />
            <input
              type="text"
              value={appointmentForm.department}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, department: event.target.value })}
              placeholder="Department"
              required
            />
            <input
              type="date"
              value={appointmentForm.date}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, date: event.target.value })}
              required
            />
            <input
              value={appointmentForm.notes}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, notes: event.target.value })}
              placeholder="Reason for visit"
            />
            <button className="button" type="submit">Create appointment</button>
          </form>
        </article>

        <article className="admin-card admin-module-wide">
          <div className="admin-card-heading"><h3>My appointment requests</h3><span>Live records</span></div>
          <PatientTable
            columns={['Date', 'Time', 'Doctor', 'Department', 'Status']}
            rows={appointments.map((item) => ({
              Date: item.date,
              Time: item.time || 'Not assigned',
              Doctor: item.doctor || 'Not assigned',
              Department: item.department,
              Status: item.status || 'Requested'
            }))}
          />
        </article>
      </section>
    );
  }
  if (feature === 'doctors') {
    return (
      <section className="admin-module-layout">
        <article className="admin-card">
          <div className="admin-card-heading"><h3>Add doctor</h3><span>Create</span></div>
          <form className="admin-crud-form" onSubmit={(event) => {
            event.preventDefault();
            onCreateDoctor(doctorForm);
            setDoctorForm({ name: '', specialty: '', role: '', credentials: '', badge: '', nextSlot: '', contact: '', imageUrl: '' });
          }}>
            <input value={doctorForm.name} onChange={(event) => setDoctorForm({ ...doctorForm, name: event.target.value })} placeholder="Doctor name" required />
            <input value={doctorForm.specialty} onChange={(event) => setDoctorForm({ ...doctorForm, specialty: event.target.value })} placeholder="Specialty" required />
            <input value={doctorForm.role} onChange={(event) => setDoctorForm({ ...doctorForm, role: event.target.value })} placeholder="Role / title shown on card" />
            <input value={doctorForm.credentials} onChange={(event) => setDoctorForm({ ...doctorForm, credentials: event.target.value })} placeholder="Credentials" />
            <input value={doctorForm.badge} onChange={(event) => setDoctorForm({ ...doctorForm, badge: event.target.value })} placeholder="Badge" />
            <input value={doctorForm.nextSlot} onChange={(event) => setDoctorForm({ ...doctorForm, nextSlot: event.target.value })} placeholder="Next slot" />
            <input value={doctorForm.contact} onChange={(event) => setDoctorForm({ ...doctorForm, contact: event.target.value })} placeholder="Contact" />
            <input type="url" value={doctorForm.imageUrl} onChange={(event) => setDoctorForm({ ...doctorForm, imageUrl: event.target.value })} placeholder="Doctor image URL" />
            <button className="button" type="submit">Create doctor</button>
          </form>
        </article>
        <article className="admin-card admin-module-wide">
          <div className="admin-card-heading"><h3>Doctors</h3><span>Live records</span></div>
          <PatientTable
            columns={['Doctor', 'Specialty', 'Role', 'Credentials', 'Image']}
            rows={doctors.map((item) => ({ _id: item._id, Doctor: item.name, Specialty: item.specialty, Role: item.role || 'Consultant', Credentials: item.credentials || '-', Image: item.imageUrl ? 'Added' : 'Missing' }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => onUpdateDoctor(row._id, { nextSlot: 'Updated by patient portal' })}>Update</button>
                <button type="button" onClick={() => onDeleteDoctor(row._id)}>Delete</button>
              </span>
            )}
          />
        </article>
      </section>
    );
  }
  if (feature === 'records') {
    return (
      <section className="admin-module-layout">
        <article className="admin-card">
          <div className="admin-card-heading"><h3>Add record</h3><span>Create</span></div>
          <form className="admin-crud-form" onSubmit={(event) => {
            event.preventDefault();
            onCreateRecord(recordForm);
            setRecordForm({ record: '', date: '', status: 'Ready', note: '' });
          }}>
            <input value={recordForm.record} onChange={(event) => setRecordForm({ ...recordForm, record: event.target.value })} placeholder="Record name" required />
            <input type="date" value={recordForm.date} onChange={(event) => setRecordForm({ ...recordForm, date: event.target.value })} required />
            <select value={recordForm.status} onChange={(event) => setRecordForm({ ...recordForm, status: event.target.value })}>
              <option>Ready</option>
              <option>Reviewed</option>
              <option>Archived</option>
            </select>
            <input value={recordForm.note} onChange={(event) => setRecordForm({ ...recordForm, note: event.target.value })} placeholder="Note" />
            <button className="button" type="submit">Create record</button>
          </form>
        </article>
        <article className="admin-card admin-module-wide">
          <div className="admin-card-heading"><h3>Records</h3><span>Live records</span></div>
          <PatientTable
            columns={['Record', 'Date', 'Status', 'Note']}
            rows={records.map((item) => ({ _id: item._id, Record: item.record, Date: item.date, Status: item.status, Note: item.note }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => onUpdateRecord(row._id, { status: 'Reviewed' })}>Review</button>
                <button type="button" onClick={() => onDeleteRecord(row._id)}>Delete</button>
              </span>
            )}
          />
        </article>
      </section>
    );
  }
  if (feature === 'billing') {
    return (
      <section className="admin-module-layout">
        <article className="admin-card">
          <div className="admin-card-heading"><h3>Add bill</h3><span>Create</span></div>
          <form className="admin-crud-form" onSubmit={(event) => {
            event.preventDefault();
            onCreateBill(billForm);
            setBillForm({ invoice: '', service: '', amount: '', status: 'Due' });
          }}>
            <input value={billForm.invoice} onChange={(event) => setBillForm({ ...billForm, invoice: event.target.value })} placeholder="Invoice ID" required />
            <input value={billForm.service} onChange={(event) => setBillForm({ ...billForm, service: event.target.value })} placeholder="Service" required />
            <input value={billForm.amount} onChange={(event) => setBillForm({ ...billForm, amount: event.target.value })} placeholder="Amount" required />
            <select value={billForm.status} onChange={(event) => setBillForm({ ...billForm, status: event.target.value })}>
              <option>Due</option>
              <option>Paid</option>
              <option>Insurance pending</option>
            </select>
            <button className="button" type="submit">Create bill</button>
          </form>
        </article>
        <article className="admin-card admin-module-wide">
          <div className="admin-card-heading"><h3>Billing</h3><span>Live records</span></div>
          <PatientTable
            columns={['Invoice', 'Service', 'Amount', 'Status']}
            rows={bills.map((item) => ({ _id: item._id, Invoice: item.invoice, Service: item.service, Amount: item.amount, Status: item.status }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => onUpdateBill(row._id, { status: 'Paid' })}>Mark paid</button>
                <button type="button" onClick={() => onDeleteBill(row._id)}>Delete</button>
              </span>
            )}
          />
        </article>
      </section>
    );
  }
  if (feature === 'support') {
    return (
      <section className="admin-module-layout">
        <article className="admin-card">
          <div className="admin-card-heading"><h3>Create support request</h3><span>Create</span></div>
          <form className="admin-crud-form" onSubmit={(event) => {
            event.preventDefault();
            onCreateContact(supportForm);
            setSupportForm({ name: `${session?.firstName || ''} ${session?.lastName || ''}`.trim(), email: session?.email || '', subject: '', message: '' });
          }}>
            <input value={supportForm.name} onChange={(event) => setSupportForm({ ...supportForm, name: event.target.value })} placeholder="Name" required />
            <input type="email" value={supportForm.email} onChange={(event) => setSupportForm({ ...supportForm, email: event.target.value })} placeholder="Email" required />
            <input value={supportForm.subject} onChange={(event) => setSupportForm({ ...supportForm, subject: event.target.value })} placeholder="Subject" required />
            <textarea value={supportForm.message} onChange={(event) => setSupportForm({ ...supportForm, message: event.target.value })} placeholder="Message" required />
            <button className="button" type="submit">Create request</button>
          </form>
        </article>
        <article className="admin-card admin-module-wide">
          <div className="admin-card-heading"><h3>Support requests</h3><span>Help desk</span></div>
          <PatientTable
            columns={['Subject', 'Status', 'Message']}
            rows={contacts.map((item) => ({ _id: item._id, Subject: item.subject, Status: item.status || 'Open', Message: item.message }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => onUpdateContact(row._id, { status: 'Resolved' })}>Resolve</button>
                <button type="button" onClick={() => onDeleteContact(row._id)}>Delete</button>
              </span>
            )}
          />
        </article>
      </section>
    );
  }
  return null;
}

function PatientDashboardFeaturePage() {
  const { feature } = useParams();
  const { logout } = useAuth();
  const session = storage.readSession(storageKeys.authSession, null);
  const page = patientFeaturePages[feature];
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);
  const [bills, setBills] = useState([]);

  function loadData() {
    Promise.allSettled([
      api.getAppointments(),
      api.getContacts(),
      api.getDoctors(),
      api.getRecords(),
      api.getBills()
    ]).then(([appointmentsResult, contactsResult, doctorsResult, recordsResult, billsResult]) => {
      if (appointmentsResult.status === 'fulfilled') setAppointments(appointmentsResult.value.data || []);
      if (contactsResult.status === 'fulfilled') setContacts(contactsResult.value.data || []);
      if (doctorsResult.status === 'fulfilled') setDoctors(doctorsResult.value.data || []);
      if (recordsResult.status === 'fulfilled') setRecords(recordsResult.value.data || []);
      if (billsResult.status === 'fulfilled') setBills(billsResult.value.data || []);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateAppointment(data) {
    await api.createAppointment({
      ...data,
      status: 'Requested'
    });
    loadData();
  }

  async function handleCreateDoctor(data) {
    await api.createDoctor(data);
    loadData();
  }

  async function handleUpdateDoctor(id, data) {
    await api.updateDoctor(id, data);
    loadData();
  }

  async function handleDeleteDoctor(id) {
    await api.deleteDoctor(id);
    loadData();
  }

  async function handleCreateRecord(data) {
    await api.createRecord(data);
    loadData();
  }

  async function handleUpdateRecord(id, data) {
    await api.updateRecord(id, data);
    loadData();
  }

  async function handleDeleteRecord(id) {
    await api.deleteRecord(id);
    loadData();
  }

  async function handleCreateBill(data) {
    await api.createBill(data);
    loadData();
  }

  async function handleUpdateBill(id, data) {
    await api.updateBill(id, data);
    loadData();
  }

  async function handleDeleteBill(id) {
    await api.deleteBill(id);
    loadData();
  }

  async function handleCreateContact(data) {
    await api.createContact(data);
    loadData();
  }

  async function handleUpdateContact(id, data) {
    await api.updateContact(id, data);
    loadData();
  }

  async function handleDeleteContact(id) {
    await api.deleteContact(id);
    loadData();
  }

  if (!session) return <Navigate to="/login" replace />;
  if (!page) return <Navigate to="/patient-dashboard" replace />;

  return (
    <main className="page admin-page">
      <div className="page-inner admin-page-inner">
        <PatientDashboardNavbar onLogout={logout} />
        <section className="admin-feature-page">
          <div className="admin-feature-hero doctor-hero">
            <div>
              <span className="admin-date">{page.kicker}</span>
              <h1>{page.title}</h1>
              <p>{page.summary}</p>
            </div>
            <Link className="button-secondary" to="/patient-dashboard">Back to overview</Link>
          </div>
          <article className="admin-card">
            <div className="admin-card-heading"><h3>{page.title}</h3><span>Patient portal</span></div>
            <PatientFeatureModule
              feature={feature}
              appointments={appointments}
              contacts={contacts}
              doctors={doctors}
              records={records}
              bills={bills}
              session={session}
              onCreateAppointment={handleCreateAppointment}
              onCreateDoctor={handleCreateDoctor}
              onUpdateDoctor={handleUpdateDoctor}
              onDeleteDoctor={handleDeleteDoctor}
              onCreateRecord={handleCreateRecord}
              onUpdateRecord={handleUpdateRecord}
              onDeleteRecord={handleDeleteRecord}
              onCreateBill={handleCreateBill}
              onUpdateBill={handleUpdateBill}
              onDeleteBill={handleDeleteBill}
              onCreateContact={handleCreateContact}
              onUpdateContact={handleUpdateContact}
              onDeleteContact={handleDeleteContact}
            />
          </article>
        </section>
      </div>
    </main>
  );
}

export default PatientDashboardFeaturePage;
