export const storageKeys = {
  users: 'medicare_users',
  authSession: 'medicare_auth_session',
  rememberedEmail: 'medicare_email',
  signupDraft: 'medicare_signup_draft',
  lastSignup: 'medicare_last_signup',
  appointmentDraft: 'medicare_appointment_draft',
  appointmentRequests: 'medicare_appointment_requests',
  contactDraft: 'medicare_contact_draft',
  contactMessages: 'medicare_contact_messages'
};

function readStorageValue(storage, key, fallback) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorageValue(storage, key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
}

function removeStorageValue(storage, key) {
  if (typeof window === 'undefined') {
    return;
  }

  storage.removeItem(key);
}

export const storage = {
  readLocal: (key, fallback = null) => readStorageValue(window.localStorage, key, fallback),
  readSession: (key, fallback = null) => readStorageValue(window.sessionStorage, key, fallback),
  writeLocal: (key, value) => writeStorageValue(window.localStorage, key, value),
  writeSession: (key, value) => writeStorageValue(window.sessionStorage, key, value),
  removeLocal: (key) => removeStorageValue(window.localStorage, key),
  removeSession: (key) => removeStorageValue(window.sessionStorage, key)
};
