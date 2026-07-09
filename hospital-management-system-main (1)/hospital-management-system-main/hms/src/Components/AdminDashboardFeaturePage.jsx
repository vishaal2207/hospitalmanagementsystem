import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import AdminDashboardNavbar from './AdminDashboard/AdminDashboardNavbar';
import { api } from '../Utils/api';
import { adminFeaturePages } from './AdminDashboard/adminDashboardData';

function AdminModuleTable({ columns, rows, renderActions }) {
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

/* ─────────────────────────────────────────────────────────────
   DEPARTMENTS MODULE — full CRUD (local state, no backend endpoint)
───────────────────────────────────────────────────────────── */
const emptyDeptForm = { name: '', head: '', floor: '', rooms: '', services: '', load: 'Normal' };

function DepartmentsModule({ users }) {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(emptyDeptForm);
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (editingId) {
      setDepartments((prev) => prev.map((d) => d.id === editingId ? { ...d, ...form } : d));
      setEditingId(null);
    } else {
      setDepartments((prev) => [...prev, { ...form, id: `d${Date.now()}` }]);
    }
    setForm(emptyDeptForm);
  }

  function startEdit(dept) {
    setEditingId(dept.id);
    setForm({ name: dept.name, head: dept.head, floor: dept.floor, rooms: dept.rooms, services: dept.services, load: dept.load });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyDeptForm);
  }

  function deleteDept(id) {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  }

  // Overlay live doctor data from API on top of local department list
  const doctors = users.filter((u) => u.role === 'Doctor');
  const doctorsByDept = doctors.reduce((acc, d) => {
    const key = d.department || 'Unassigned';
    return { ...acc, [key]: [...(acc[key] || []), d] };
  }, {});

  return (
    <section className="admin-module-layout">
      {/* Create / Edit form */}
      <article className="admin-card">
        <div className="admin-card-heading">
          <h3>{editingId ? 'Edit department' : 'Add department'}</h3>
          <span>{editingId ? 'Update' : 'Create'}</span>
        </div>
        <form className="admin-crud-form" onSubmit={handleSubmit}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Department name" required />
          <input value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} placeholder="Department head" required />
          <input value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} placeholder="Floor / location" required />
          <input value={form.rooms} onChange={(e) => setForm({ ...form, rooms: e.target.value })} placeholder="Room numbers" required />
          <input value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} placeholder="Services (comma-separated)" required />
          <select value={form.load} onChange={(e) => setForm({ ...form, load: e.target.value })}>
            <option>Normal</option>
            <option>Stable</option>
            <option>Busy</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <button className="button" type="submit">{editingId ? 'Save changes' : 'Add department'}</button>
          {editingId && <button type="button" onClick={cancelEdit} style={{ marginTop: '0.5rem' }}>Cancel edit</button>}
        </form>
      </article>

      {/* Department directory */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading">
          <h3>Department directory</h3>
          <span>{departments.length} departments</span>
        </div>
        {departments.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No departments have been added yet.</p>
        ) : (
        <div className="department-directory">
          {departments.map((dept) => {
            const liveDoctors = doctorsByDept[dept.name] || [];
            return (
              <div className="department-directory-card" key={dept.id}>
                <div className="department-directory-head">
                  <div>
                    <strong>{dept.name}</strong>
                    <span>{dept.head} — {dept.floor}</span>
                  </div>
                  <em>{dept.load}</em>
                </div>
                <div className="admin-mini-grid">
                  <div><b>Rooms</b><span>{dept.rooms}</span></div>
                  <div><b>Services</b><span>{dept.services}</span></div>
                  {liveDoctors.length > 0 && (
                    <div><b>Doctors ({liveDoctors.length})</b><span>{liveDoctors.map((d) => `${d.firstName} ${d.lastName}`).join(', ')}</span></div>
                  )}
                </div>
                <span className="admin-action-row" style={{ marginTop: '0.75rem' }}>
                  <button type="button" onClick={() => startEdit(dept)}>Edit</button>
                  <button type="button" onClick={() => deleteDept(dept.id)} style={{ color: 'crimson' }}>Delete</button>
                </span>
              </div>
            );
          })}
        </div>
        )}
      </article>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   APPOINTMENTS MODULE — read + status update + delete (no create)
───────────────────────────────────────────────────────────── */
function AppointmentsModule({ appointments, onStatusChange, onUpdateAppointment, onDelete }) {
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

  async function saveAppointment(id) {
    await onUpdateAppointment(id, form);
    setEditingId(null);
  }

  return (
    <section className="admin-module-layout">
      {/* Appointment queue table */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading">
          <h3>Appointment queue</h3>
          <span>All requests</span>
        </div>
        {appointments.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No appointments found.</p>
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
                        <button type="button" onClick={() => saveAppointment(item._id)}>Save</button>
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
                        <button type="button" onClick={() => startEdit(item)}>Schedule</button>
                        {(item.status || 'Requested') === 'Requested' && (
                          <button type="button" onClick={() => onStatusChange(item._id, 'Confirmed')}>Accept</button>
                        )}
                        {(item.status === 'Confirmed' || item.status === 'Checked in') && (
                          <button type="button" onClick={() => onStatusChange(item._id, 'Completed')}>Complete</button>
                        )}
                        <button type="button" onClick={() => onDelete(item._id)} style={{ color: 'crimson' }}>Delete</button>
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </article>

      {/* Status summary */}
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Status summary</h3><span>Live count</span></div>
        <div className="admin-lane-list">
          <div><strong>Requested</strong><span>{appointments.filter((a) => (a.status || 'Requested') === 'Requested').length} pending</span></div>
          <div><strong>Confirmed</strong><span>{appointments.filter((a) => a.status === 'Confirmed').length} approved</span></div>
          <div><strong>Checked in</strong><span>{appointments.filter((a) => a.status === 'Checked in').length} arrived</span></div>
          <div><strong>Completed</strong><span>{appointments.filter((a) => a.status === 'Completed').length} closed</span></div>
          <div><strong>Cancelled</strong><span>{appointments.filter((a) => a.status === 'Cancelled').length} cancelled</span></div>
        </div>
      </article>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAFF MODULE — department-style side form (Create / Edit toggle)
   + Edit and Remove buttons always visible per real DB row
───────────────────────────────────────────────────────────── */
const emptyDoctorForm = {
  name: '',
  specialty: '',
  role: '',
  credentials: '',
  badge: '',
  nextSlot: '',
  contact: '',
  imageUrl: ''
};

function DoctorsModule({ doctors, onCreateDoctor, onUpdateDoctor, onDeleteDoctor }) {
  const [form, setForm] = useState(emptyDoctorForm);
  const [editingId, setEditingId] = useState(null);

  function startEdit(doctor) {
    setEditingId(doctor._id);
    setForm({
      name: doctor.name || '',
      specialty: doctor.specialty || '',
      role: doctor.role || '',
      credentials: doctor.credentials || '',
      badge: doctor.badge || '',
      nextSlot: doctor.nextSlot || '',
      contact: doctor.contact || '',
      imageUrl: doctor.imageUrl || ''
    });
    document.getElementById('doctor-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyDoctorForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (editingId) {
      await onUpdateDoctor(editingId, form);
      setEditingId(null);
    } else {
      await onCreateDoctor(form);
    }
    setForm(emptyDoctorForm);
  }

  return (
    <section className="admin-module-layout">
      <article className="admin-card" id="doctor-form-card">
        <div className="admin-card-heading">
          <h3>{editingId ? 'Edit doctor profile' : 'Add doctor profile'}</h3>
          <span>{editingId ? 'Update' : 'Create'}</span>
        </div>
        <form className="admin-crud-form" onSubmit={handleSubmit}>
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Doctor name" required />
          <input value={form.specialty} onChange={(event) => setForm({ ...form, specialty: event.target.value })} placeholder="Specialty" required />
          <input value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} placeholder="Role / title shown on card" />
          <input value={form.credentials} onChange={(event) => setForm({ ...form, credentials: event.target.value })} placeholder="Credentials (MBBS, MD, DM...)" />
          <input value={form.badge} onChange={(event) => setForm({ ...form, badge: event.target.value })} placeholder="Badge (Founder, CEO, Senior...)" />
          <input value={form.nextSlot} onChange={(event) => setForm({ ...form, nextSlot: event.target.value })} placeholder="Next slot / availability" />
          <input value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="Contact" />
          <input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="Doctor image URL" />
          <button className="button" type="submit">{editingId ? 'Save changes' : 'Create doctor'}</button>
          {editingId && <button type="button" onClick={cancelEdit} style={{ marginTop: '0.5rem' }}>Cancel edit</button>}
        </form>
      </article>

      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading">
          <h3>Doctor profiles</h3>
          <span>{doctors.length} records</span>
        </div>
        {doctors.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No doctor profiles yet. Use the form to add one.</p>
        ) : (
          <AdminModuleTable
            columns={['Doctor', 'Specialty', 'Role', 'Credentials', 'Image']}
            rows={doctors.map((item) => ({
              _id: item._id,
              Doctor: item.name,
              Specialty: item.specialty,
              Role: item.role || 'Consultant',
              Credentials: item.credentials || '-',
              Image: item.imageUrl ? 'Added' : 'Missing'
            }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => startEdit(doctors.find((doctor) => doctor._id === row._id))}>
                  {editingId === row._id ? 'Editing...' : 'Edit'}
                </button>
                <button type="button" onClick={() => { if (editingId === row._id) cancelEdit(); onDeleteDoctor(row._id); }} style={{ color: 'crimson' }}>
                  Delete
                </button>
              </span>
            )}
          />
        )}
      </article>
    </section>
  );
}

const emptyUserForm = { firstName: '', lastName: '', email: '', password: '', role: 'Doctor', mobileNumber: '' };

function StaffModule({ users, onCreateUser, onUpdateUser, onDeleteUser }) {
  // Single form that handles both Create and Edit
  const [form, setForm] = useState(emptyUserForm);
  const [editingId, setEditingId] = useState(null);   // null = Create mode, string = Edit mode

  const staffUsers = users.filter((u) => u.role !== 'Patient');

  function startEdit(user) {
    setEditingId(user._id);
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      password: '',           // never pre-fill password
      role: user.role || 'Doctor',
      mobileNumber: user.mobileNumber || ''
    });
    // Scroll the form into view smoothly
    document.getElementById('staff-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyUserForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (editingId) {
      // Update — omit password if left blank
      const payload = { firstName: form.firstName, lastName: form.lastName, role: form.role, mobileNumber: form.mobileNumber };
      if (form.password) payload.password = form.password;
      await onUpdateUser(editingId, payload);
      setEditingId(null);
    } else {
      await onCreateUser(form);
    }
    setForm(emptyUserForm);
  }

  const coverageRows = ['Hospital Admin', 'Doctor'].map((role) => ({
    Team: role,
    Coverage: String(staffUsers.filter((u) => u.role === role).length),
    Shift: 'Managed account',
    Note: 'Created via staff management'
  }));

  return (
    <section className="admin-module-layout">
      {/* Create / Edit form — same card, title switches */}
      <article className="admin-card" id="staff-form-card">
        <div className="admin-card-heading">
          <h3>{editingId ? 'Edit staff account' : 'Create staff account'}</h3>
          <span>{editingId ? 'Update' : 'Create'}</span>
        </div>
        <form className="admin-crud-form" onSubmit={handleSubmit}>
          <input
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="First name"
            required
          />
          <input
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="Last name"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required={!editingId}
            readOnly={!!editingId}   // email is the unique key — don't allow changing it
            style={editingId ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder={editingId ? 'New password (leave blank to keep current)' : 'Password'}
            required={!editingId}
          />
          <input
            value={form.mobileNumber}
            onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
            placeholder="Mobile number"
          />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option>Doctor</option>
            <option>Hospital Admin</option>
            <option>Patient</option>
          </select>
          <button className="button" type="submit">
            {editingId ? 'Save changes' : 'Create account'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{ marginTop: '0.5rem' }}>
              Cancel edit
            </button>
          )}
        </form>
      </article>

      {/* Employee directory — Edit + Remove on every real DB row */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading">
          <h3>Employee directory</h3>
          <span>{staffUsers.length} staff accounts</span>
        </div>
        {staffUsers.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No staff accounts yet. Use the form to create one.</p>
        ) : (
          <AdminModuleTable
            columns={['Name', 'Role', 'Mobile', 'Email', 'Dept']}
            rows={staffUsers.map((item) => ({
              _id: item._id,
              Name: `${item.firstName} ${item.lastName}`,
              Role: item.role,
              Mobile: item.mobileNumber || '—',
              Email: item.email,
              Dept: item.department || '—'
            }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button
                  type="button"
                  onClick={() => startEdit(staffUsers.find((u) => u._id === row._id))}
                  style={editingId === row._id ? { fontWeight: 'bold' } : {}}
                >
                  {editingId === row._id ? 'Editing…' : 'Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => { if (editingId === row._id) cancelEdit(); onDeleteUser(row._id); }}
                  style={{ color: 'crimson' }}
                >
                  Remove
                </button>
              </span>
            )}
          />
        )}
      </article>

      {/* Team coverage summary */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Team coverage</h3><span>Roster</span></div>
        <AdminModuleTable columns={['Team', 'Coverage', 'Shift', 'Note']} rows={coverageRows} />
      </article>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RESOURCES MODULE — full CRUD on contacts/messages
   (Create, Read, Update status to any value, Delete)
───────────────────────────────────────────────────────────── */
const emptyContactForm = { name: '', email: '', subject: '', message: '' };

function ResourcesModule({ contacts, onCreateContact, onUpdateContact, onDeleteContact }) {
  const [form, setForm] = useState(emptyContactForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  function startEdit(contact) {
    setEditingId(contact._id);
    setEditForm({ subject: contact.subject, message: contact.message, status: contact.status || 'Open' });
  }

  async function saveEdit(id) {
    await onUpdateContact(id, editForm);
    setEditingId(null);
    setEditForm({});
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function handleCreate(event) {
    event.preventDefault();
    await onCreateContact(form);
    setForm(emptyContactForm);
  }

  return (
    <section className="admin-module-layout">
      {/* Create message */}
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Create support message</h3><span>Create</span></div>
        <form className="admin-crud-form" onSubmit={handleCreate}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
          <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" required />
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" required rows={3} />
          <button className="button" type="submit">Create message</button>
        </form>
      </article>

      {/* Message register with inline edit */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Support message register</h3><span>Live messages</span></div>
        {contacts.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No messages found.</p>
        ) : (
          <div className="admin-module-table">
            <div className="admin-module-table-head" style={{ gridTemplateColumns: 'repeat(6, minmax(130px, 1fr))' }}>
              <span>Name</span><span>Email</span><span>Subject</span><span>Status</span><span>Message</span><span>Actions</span>
            </div>
            {contacts.map((item) => {
              const isEditing = editingId === item._id;
              return (
                <div className="admin-module-table-row" style={{ gridTemplateColumns: 'repeat(6, minmax(130px, 1fr))' }} key={item._id}>
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                  {isEditing ? (
                    <>
                      <span><input value={editForm.subject} onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })} style={{ width: '100%' }} /></span>
                      <span>
                        <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} style={{ width: '100%' }}>
                          <option>Open</option>
                          <option>In progress</option>
                          <option>Resolved</option>
                        </select>
                      </span>
                      <span><input value={editForm.message} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })} style={{ width: '100%' }} /></span>
                      <span className="admin-action-row">
                        <button type="button" onClick={() => saveEdit(item._id)}>Save</button>
                        <button type="button" onClick={cancelEdit}>Cancel</button>
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{item.subject}</span>
                      <span>{item.status || 'Open'}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.message}</span>
                      <span className="admin-action-row">
                        <button type="button" onClick={() => startEdit(item)}>Edit</button>
                        <button type="button" onClick={() => onUpdateContact(item._id, { status: 'Resolved' })}>Resolve</button>
                        <button type="button" onClick={() => onDeleteContact(item._id)} style={{ color: 'crimson' }}>Delete</button>
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </article>

      {/* Bed allocation info card */}
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Bed allocation</h3><span>Capacity</span></div>
        <div className="admin-lane-list">
          <div><strong>ICU</strong><span>9 available / 32 total</span></div>
          <div><strong>General ward</strong><span>27 available / 118 total</span></div>
          <div><strong>Private rooms</strong><span>6 available / 24 total</span></div>
          <div><strong>Isolation</strong><span>3 available / 10 total</span></div>
        </div>
      </article>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   REPORTS MODULE — read + delete appointments and contacts
───────────────────────────────────────────────────────────── */
function ReportsModule({ users, appointments, contacts, doctors, records, bills, onDeleteAppointment, onDeleteContact }) {
  return (
    <section className="admin-module-layout">
      {/* Appointments report */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Appointment records</h3><span>Read / Delete</span></div>
        {appointments.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No appointment records.</p>
        ) : (
          <AdminModuleTable
            columns={['Date', 'Patient', 'Department', 'Status']}
            rows={appointments.map((item) => ({
              _id: item._id,
              Date: item.date || item.time || '—',
              Patient: item.patientName || item.patient || '—',
              Department: item.department,
              Status: item.status || 'Requested'
            }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => onDeleteAppointment(row._id)} style={{ color: 'crimson' }}>Delete</button>
              </span>
            )}
          />
        )}
      </article>

      {/* Contacts report */}
      <article className="admin-card admin-module-wide">
        <div className="admin-card-heading"><h3>Support message records</h3><span>Read / Delete</span></div>
        {contacts.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--text-muted, #888)' }}>No support message records.</p>
        ) : (
          <AdminModuleTable
            columns={['Name', 'Subject', 'Status']}
            rows={contacts.map((item) => ({
              _id: item._id,
              Name: item.name,
              Subject: item.subject,
              Status: item.status || 'Open'
            }))}
            renderActions={(row) => (
              <span className="admin-action-row">
                <button type="button" onClick={() => onDeleteContact(row._id)} style={{ color: 'crimson' }}>Delete</button>
              </span>
            )}
          />
        )}
      </article>

      {/* Summary stats */}
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Summary</h3><span>Live counts</span></div>
        <div className="admin-lane-list">
          <div><strong>Total users</strong><span>{users.length} registered</span></div>
          <div><strong>Appointments</strong><span>{appointments.length} records</span></div>
          <div><strong>Open messages</strong><span>{contacts.filter((c) => (c.status || 'Open') === 'Open').length} unresolved</span></div>
          <div><strong>Doctors</strong><span>{users.filter((u) => u.role === 'Doctor').length} clinical accounts</span></div>
          <div><strong>Patient doctor records</strong><span>{doctors.length} records</span></div>
          <div><strong>Medical records</strong><span>{records.length} records</span></div>
          <div><strong>Billing records</strong><span>{bills.length} records</span></div>
        </div>
      </article>

      {/* Analytics */}
      <article className="admin-card">
        <div className="admin-card-heading"><h3>Analytics</h3><span>Insights</span></div>
        <div className="admin-lane-list">
          <div><strong>Admissions trend</strong><span>+8% this week</span></div>
          <div><strong>OPD completion</strong><span>91% completed</span></div>
          <div><strong>Billing collection</strong><span>84% collected</span></div>
          <div><strong>Inventory variance</strong><span>2 items flagged</span></div>
        </div>
      </article>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURE ROUTER
───────────────────────────────────────────────────────────── */
function AdminFeatureModule({
  feature, users, appointments, contacts, doctors, records, bills,
  onStatusChange, onUpdateAppointment, onDeleteAppointment,
  onCreateUser, onUpdateUser, onDeleteUser,
  onCreateDoctor, onUpdateDoctor, onDeleteDoctor,
  onCreateContact, onUpdateContact, onDeleteContact
}) {
  if (feature === 'departments') return <DepartmentsModule users={users} />;
  if (feature === 'appointments') return <AppointmentsModule appointments={appointments} onStatusChange={onStatusChange} onUpdateAppointment={onUpdateAppointment} onDelete={onDeleteAppointment} />;
  if (feature === 'doctors') return <DoctorsModule doctors={doctors} onCreateDoctor={onCreateDoctor} onUpdateDoctor={onUpdateDoctor} onDeleteDoctor={onDeleteDoctor} />;
  if (feature === 'staff') return <StaffModule users={users} onCreateUser={onCreateUser} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />;
  if (feature === 'resources') return <ResourcesModule contacts={contacts} onCreateContact={onCreateContact} onUpdateContact={onUpdateContact} onDeleteContact={onDeleteContact} />;
  if (feature === 'reports') return <ReportsModule users={users} appointments={appointments} contacts={contacts} doctors={doctors} records={records} bills={bills} onDeleteAppointment={onDeleteAppointment} onDeleteContact={onDeleteContact} />;
  return null;
}

/* ─────────────────────────────────────────────────────────────
   PAGE SHELL
───────────────────────────────────────────────────────────── */
function AdminDashboardFeaturePage() {
  const { feature } = useParams();
  const { logout } = useAuth();
  const session = storage.readSession(storageKeys.authSession, null);
  const page = adminFeaturePages[feature];
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);
  const [bills, setBills] = useState([]);

  async function loadData() {
    const [usersResult, appointmentsResult, contactsResult, doctorsResult, recordsResult, billsResult] = await Promise.allSettled([
      api.getUsers(),
      api.getAppointments(),
      api.getContacts(),
      api.getDoctors(),
      api.getRecords(),
      api.getBills()
    ]);
    if (usersResult.status === 'fulfilled') setUsers(usersResult.value.data || []);
    if (appointmentsResult.status === 'fulfilled') setAppointments(appointmentsResult.value.data || []);
    if (contactsResult.status === 'fulfilled') setContacts(contactsResult.value.data || []);
    if (doctorsResult.status === 'fulfilled') setDoctors(doctorsResult.value.data || []);
    if (recordsResult.status === 'fulfilled') setRecords(recordsResult.value.data || []);
    if (billsResult.status === 'fulfilled') setBills(billsResult.value.data || []);
  }

  useEffect(() => { loadData(); }, []);

  async function handleAppointmentStatus(id, status) { await api.updateAppointment(id, { status }); loadData(); }
  async function handleUpdateAppointment(id, data) { await api.updateAppointment(id, data); loadData(); }
  async function handleDeleteAppointment(id) { await api.deleteAppointment(id); loadData(); }

  async function handleCreateUser(data) { await api.createManagedUser(data); loadData(); }
  async function handleUpdateUser(id, data) { await api.updateUser(id, data); loadData(); }
  async function handleDeleteUser(id) { await api.deleteUser(id); loadData(); }

  async function handleCreateDoctor(data) { await api.createDoctor(data); loadData(); }
  async function handleUpdateDoctor(id, data) { await api.updateDoctor(id, data); loadData(); }
  async function handleDeleteDoctor(id) { await api.deleteDoctor(id); loadData(); }

  async function handleCreateContact(data) { await api.createContact(data); loadData(); }
  async function handleUpdateContact(id, data) { await api.updateContact(id, data); loadData(); }
  async function handleDeleteContact(id) { await api.deleteContact(id); loadData(); }

  const liveStats = useMemo(() => ({
    departments: [
      { label: 'Doctors', value: String(users.filter((u) => u.role === 'Doctor').length), note: 'Registered doctor accounts' },
      { label: 'Departments', value: String(new Set(users.filter((u) => u.role === 'Doctor').map((u) => u.department).filter(Boolean)).size), note: 'Based on doctor records' },
      { label: 'Staff accounts', value: String(users.filter((u) => u.role !== 'Patient').length), note: 'Admin and doctors' }
    ],
    appointments: [
      { label: 'Total', value: String(appointments.length), note: 'All appointment records' },
      { label: 'Requested', value: String(appointments.filter((a) => (a.status || 'Requested') === 'Requested').length), note: 'Waiting approval' },
      { label: 'Confirmed', value: String(appointments.filter((a) => a.status === 'Confirmed').length), note: 'Approved visits' }
    ],
    staff: [
      { label: 'Staff users', value: String(users.filter((u) => u.role !== 'Patient').length), note: 'Admin and doctors' },
      { label: 'Doctors', value: String(users.filter((u) => u.role === 'Doctor').length), note: 'Clinical accounts' },
      { label: 'Admins', value: String(users.filter((u) => u.role === 'Hospital Admin').length), note: 'Admin accounts' }
    ],
    doctors: [
      { label: 'Profiles', value: String(doctors.length), note: 'Doctor directory records' },
      { label: 'With images', value: String(doctors.filter((doctor) => doctor.imageUrl).length), note: 'Profiles with photo URLs' },
      { label: 'Specialties', value: String(new Set(doctors.map((doctor) => doctor.specialty).filter(Boolean)).size), note: 'Unique clinical areas' }
    ],
    resources: [
      { label: 'Messages', value: String(contacts.length), note: 'Total support records' },
      { label: 'Open', value: String(contacts.filter((c) => (c.status || 'Open') === 'Open').length), note: 'Needs response' },
      { label: 'Resolved', value: String(contacts.filter((c) => c.status === 'Resolved').length), note: 'Closed messages' }
    ],
    reports: [
      { label: 'Users', value: String(users.length), note: 'Registered accounts' },
      { label: 'Appointments', value: String(appointments.length), note: 'Appointment records' },
      { label: 'Messages', value: String(contacts.length), note: 'Contact records' }
    ]
  }), [appointments, contacts, doctors, users]);

  if (!session) return <Navigate to="/login" replace />;
  if (!page) return <Navigate to="/admin-dashboard" replace />;

  return (
    <main className="page admin-page">
      <div className="page-inner admin-page-inner">
        <AdminDashboardNavbar onLogout={logout} />

        <section className="admin-feature-page" aria-labelledby="admin-feature-title">
          <div className="admin-feature-hero">
            <div>
              <span className="admin-date">{page.kicker}</span>
              <h1 id="admin-feature-title">{page.title}</h1>
              <p>{page.summary}</p>
            </div>
            <Link className="button-secondary" to="/admin-dashboard">Back to overview</Link>
          </div>

          <section className="admin-feature-stats" aria-label={`${page.title} key stats`}>
            {(liveStats[feature] || page.stats).map((stat) => (
              <article className="admin-metric" key={stat.label}>
                <span className="admin-metric-icon">{stat.label.slice(0, 2).toUpperCase()}</span>
                <span className="dashboard-stat-label">{stat.label}</span>
                <strong className="dashboard-stat-value">{stat.value}</strong>
                <span className="dashboard-stat-note">{stat.note}</span>
              </article>
            ))}
          </section>

          <AdminFeatureModule
            feature={feature}
            users={users}
            appointments={appointments}
            contacts={contacts}
            doctors={doctors}
            records={records}
            bills={bills}
            onStatusChange={handleAppointmentStatus}
            onUpdateAppointment={handleUpdateAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            onCreateUser={handleCreateUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onCreateDoctor={handleCreateDoctor}
            onUpdateDoctor={handleUpdateDoctor}
            onDeleteDoctor={handleDeleteDoctor}
            onCreateContact={handleCreateContact}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />

          <section className="admin-feature-grid" aria-label={`${page.title} details`}>
            {page.sections.map((section) => (
              <article className="admin-card" key={section.title}>
                <div className="admin-card-heading">
                  <h3>{section.title}</h3>
                  <span>Manage</span>
                </div>
                <ul className="admin-feature-list">
                  {section.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true"></span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboardFeaturePage;
