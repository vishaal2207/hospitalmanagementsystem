export const adminNavItems = [
  { label: 'Overview', path: '/admin-dashboard' },
  { label: 'Departments', path: '/admin-dashboard/departments' },
  { label: 'Appointments', path: '/admin-dashboard/appointments' },
  { label: 'Doctors', path: '/admin-dashboard/doctors' },
  { label: 'Staff', path: '/admin-dashboard/staff' },
  { label: 'Resources', path: '/admin-dashboard/resources' },
  { label: 'Reports', path: '/admin-dashboard/reports' }
];

export const adminFeaturePages = {
  departments: {
    title: 'Department management',
    kicker: 'Hospital departments',
    summary: 'Manage service-line load, doctor allocation, patient movement, and department-level operational priorities.',
    stats: [],
    sections: []
  },
  appointments: {
    title: 'Appointment management',
    kicker: 'Booking operations',
    summary: 'Control appointment approvals, patient check-ins, cancellations, doctor calendars, and front-desk queues.',
    stats: [],
    sections: []
  },
  doctors: {
    title: 'Doctor directory',
    kicker: 'Clinical team',
    summary: 'Create and maintain the doctor profiles shown on the public doctors page, including specialties, credentials, availability, and profile images.',
    stats: [],
    sections: []
  },
  staff: {
    title: 'Staff management',
    kicker: 'Workforce planning',
    summary: 'Plan shift coverage for doctors, nurses, reception, lab, pharmacy, and support teams across the hospital.',
    stats: [],
    sections: []
  },
  resources: {
    title: 'Resource management',
    kicker: 'Beds, stock, and billing',
    summary: 'Monitor bed availability, medical inventory, purchase orders, billing exceptions, and operational resource usage.',
    stats: [],
    sections: []
  },
  reports: {
    title: 'Reports and analytics',
    kicker: 'Admin insights',
    summary: 'Review hospital performance reports, financial summaries, utilization patterns, and operational trends.',
    stats: [],
    sections: []
  }
};
