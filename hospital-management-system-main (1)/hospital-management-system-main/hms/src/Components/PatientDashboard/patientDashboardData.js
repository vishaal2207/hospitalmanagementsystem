export const patientNavItems = [
  { label: 'Overview', path: '/patient-dashboard' },
  { label: 'Appointments', path: '/patient-dashboard/appointments' },
  { label: 'Doctors', path: '/patient-dashboard/doctors' },
  { label: 'Records', path: '/patient-dashboard/records' },
  { label: 'Billing', path: '/patient-dashboard/billing' },
  { label: 'Support', path: '/patient-dashboard/support' }
];

export const patientFeaturePages = {
  appointments: {
    title: 'My appointments',
    kicker: 'Visit schedule',
    summary: 'View upcoming visits, appointment status, requested bookings, and follow-up reminders.'
  },
  doctors: {
    title: 'My doctors',
    kicker: 'Care team',
    summary: 'See assigned doctors, specialties, upcoming slots, and care-team contact details.'
  },
  records: {
    title: 'Medical records',
    kicker: 'Health history',
    summary: 'Access lab reports, prescriptions, visit summaries, imaging notes, and medical documents.'
  },
  billing: {
    title: 'Billing and payments',
    kicker: 'Invoices',
    summary: 'Track invoices, insurance claims, payment status, receipts, and pending balances.'
  },
  support: {
    title: 'Patient support',
    kicker: 'Help desk',
    summary: 'Manage questions, hospital support requests, pharmacy help, and appointment assistance.'
  }
};
