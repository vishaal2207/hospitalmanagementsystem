export const doctorNavItems = [
  { label: 'Overview', path: '/doctor-dashboard' },
  { label: 'Schedule', path: '/doctor-dashboard/schedule' },
  { label: 'Patients', path: '/doctor-dashboard/patients' },
  { label: 'Consultations', path: '/doctor-dashboard/consultations' },
  { label: 'Records', path: '/doctor-dashboard/records' },
  { label: 'Reports', path: '/doctor-dashboard/reports' }
];

export const doctorFeaturePages = {
  schedule: {
    title: 'Schedule management',
    kicker: 'Clinical day planner',
    summary: 'Review appointment requests, assign doctors, set dates and times, allocate rooms, and update visit status.'
  },
  patients: {
    title: 'Patient management',
    kicker: 'Patient panel',
    summary: 'Track patients from live appointment requests, visit status, departments, phone numbers, and next clinical steps.'
  },
  consultations: {
    title: 'Consultation workspace',
    kicker: 'Clinical encounters',
    summary: 'Manage confirmed and checked-in visits from the appointment database and close consultations.'
  },
  records: {
    title: 'Medical records',
    kicker: 'Patient history',
    summary: 'Review medical records submitted through the patient portal and appointment notes shared across dashboards.'
  },
  reports: {
    title: 'Doctor reports',
    kicker: 'Clinical summaries',
    summary: 'Review live workload, appointment status, shared records, billing records, and consultation completion.'
  }
};
