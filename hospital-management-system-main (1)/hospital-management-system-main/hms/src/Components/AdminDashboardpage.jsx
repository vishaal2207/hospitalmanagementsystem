import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';
import AdminAlertsSection from './AdminDashboard/AdminAlertsSection';
import AdminAppointmentsSection from './AdminDashboard/AdminAppointmentsSection';
import AdminDashboardHero from './AdminDashboard/AdminDashboardHero';
import AdminDashboardNavbar from './AdminDashboard/AdminDashboardNavbar';
import AdminDashboardSidebar from './AdminDashboard/AdminDashboardSidebar';
import AdminDepartmentsSection from './AdminDashboard/AdminDepartmentsSection';
import AdminMetricsSection from './AdminDashboard/AdminMetricsSection';
import AdminReportsSection from './AdminDashboard/AdminReportsSection';
import AdminResourcesSection from './AdminDashboard/AdminResourcesSection';
import AdminStaffSection from './AdminDashboard/AdminStaffSection';

function AdminDashboardpage() {
  const { logout } = useAuth();
  const session = storage.readSession(storageKeys.authSession, null);
  const userName = session ? `${session.firstName || ''} ${session.lastName || ''}`.trim() : 'Hospital Admin';
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      const [appointmentsResult, usersResult, contactsResult] = await Promise.allSettled([
        api.getAppointments(),
        api.getUsers(),
        api.getContacts()
      ]);

      if (appointmentsResult.status === 'fulfilled') {
        setAppointments(appointmentsResult.value.data || []);
      }

      if (usersResult.status === 'fulfilled') {
        setUsers(usersResult.value.data || []);
      }

      if (contactsResult.status === 'fulfilled') {
        setContacts(contactsResult.value.data || []);
      }
    }

    loadDashboardData();
  }, []);

  const liveMetrics = useMemo(() => ([
    { label: 'Total users', value: String(users.length), note: 'Registered admins, doctors, and patients', icon: 'US' },
    { label: 'Appointments', value: String(appointments.length), note: `${appointments.filter((item) => (item.status || 'Requested') === 'Requested').length} waiting approval`, icon: 'AP' },
    { label: 'Doctors', value: String(users.filter((user) => user.role === 'Doctor').length), note: 'Registered doctor accounts', icon: 'DR' },
    { label: 'Patients', value: String(users.filter((user) => user.role === 'Patient').length), note: 'Registered patient accounts', icon: 'PT' },
    { label: 'Messages', value: String(contacts.length), note: `${contacts.filter((item) => (item.status || 'Open') === 'Open').length} open support messages`, icon: 'MS' },
    { label: 'Confirmed visits', value: String(appointments.filter((item) => item.status === 'Confirmed').length), note: 'Approved appointment requests', icon: 'CV' }
  ]), [appointments, contacts, users]);

  const liveDepartments = useMemo(() => {
    const doctorCount = users.filter((user) => user.role === 'Doctor').length;
    return [
      { name: 'Registered doctors', load: Math.min(100, doctorCount * 10), doctors: doctorCount, patients: users.filter((user) => user.role === 'Patient').length, status: 'Live accounts' },
      { name: 'Appointment desk', load: Math.min(100, appointments.length * 10), doctors: users.filter((user) => user.role === 'Hospital Admin').length, patients: appointments.length, status: 'Live requests' },
      { name: 'Support desk', load: Math.min(100, contacts.length * 10), doctors: users.filter((user) => user.role !== 'Patient').length, patients: contacts.length, status: 'Live messages' }
    ];
  }, [appointments, contacts, users]);

  const liveAlerts = useMemo(() => ([
    ...appointments.filter((item) => (item.status || 'Requested') === 'Requested').slice(0, 2).map((item) => ({
      title: `${item.patientName || item.patient || 'Patient'} appointment needs approval`,
      tag: 'Appointment'
    })),
    ...contacts.filter((item) => (item.status || 'Open') === 'Open').slice(0, 2).map((item) => ({
      title: `${item.subject} from ${item.name}`,
      tag: 'Message'
    }))
  ]), [appointments, contacts]);

  const liveStaffRoster = useMemo(() => ([
    { role: 'Hospital Admin', coverage: String(users.filter((user) => user.role === 'Hospital Admin').length), shift: 'System users', note: 'Registered admin accounts' },
    { role: 'Doctors', coverage: String(users.filter((user) => user.role === 'Doctor').length), shift: 'Clinical users', note: 'Registered doctor accounts' },
    { role: 'Patients', coverage: String(users.filter((user) => user.role === 'Patient').length), shift: 'Patient portal', note: 'Registered patient accounts' }
  ]), [users]);

  const liveReports = useMemo(() => [
    `Users: ${users.length} registered accounts`,
    `Appointments: ${appointments.length} total records`,
    `Messages: ${contacts.length} support records`,
    `Open appointment requests: ${appointments.filter((item) => (item.status || 'Requested') === 'Requested').length}`
  ], [appointments, contacts, users]);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="page admin-page">
      <div className="page-inner admin-page-inner">
        <AdminDashboardNavbar onLogout={logout} />

        <section className="admin-shell" aria-labelledby="admin-dashboard-title">
          <AdminDashboardSidebar userName={userName} />

          <div className="admin-content">
            <AdminDashboardHero />
            <AdminMetricsSection metrics={liveMetrics} />

            <section className="admin-grid">
              <AdminDepartmentsSection departments={liveDepartments} />
              <AdminAlertsSection alerts={liveAlerts} />
              <AdminAppointmentsSection appointments={appointments} />
              <AdminStaffSection staffRoster={liveStaffRoster} />
              <AdminResourcesSection appointments={appointments} contacts={contacts} />
              <AdminReportsSection reports={liveReports} />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboardpage;
