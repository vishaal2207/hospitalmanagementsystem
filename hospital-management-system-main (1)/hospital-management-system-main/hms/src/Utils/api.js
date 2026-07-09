const API_BASE_URL = process.env.REACT_APP_API_URL
  || (process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://hospital-management-system-y3xo.onrender.com/api');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'API request failed.');
  }

  return payload;
}

export const api = {
  signup: (data) => request('/users/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  createManagedUser: (data) => request('/users/managed', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  login: (data) => request('/users/login', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  createAppointment: (data) => request('/appointments', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  createContact: (data) => request('/contacts', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getUsers: () => request('/users'),
  updateUser: (id, data) => request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteUser: (id) => request(`/users/${id}`, {
    method: 'DELETE'
  }),
  getAppointments: () => request('/appointments'),
  updateAppointment: (id, data) => request(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAppointment: (id) => request(`/appointments/${id}`, {
    method: 'DELETE'
  }),
  getContacts: () => request('/contacts'),
  updateContact: (id, data) => request(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteContact: (id) => request(`/contacts/${id}`, {
    method: 'DELETE'
  }),
  getDoctors: () => request('/doctors'),
  createDoctor: (data) => request('/doctors', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateDoctor: (id, data) => request(`/doctors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteDoctor: (id) => request(`/doctors/${id}`, {
    method: 'DELETE'
  }),
  getRecords: () => request('/records'),
  createRecord: (data) => request('/records', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateRecord: (id, data) => request(`/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteRecord: (id) => request(`/records/${id}`, {
    method: 'DELETE'
  }),
  getBills: () => request('/bills'),
  createBill: (data) => request('/bills', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateBill: (id, data) => request(`/bills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteBill: (id) => request(`/bills/${id}`, {
    method: 'DELETE'
  })
};
