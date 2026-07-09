import React from 'react';
import { Navigate } from 'react-router-dom';
import { storage, storageKeys } from '../Utils/storage';

function DashboardRedirect() {
  const session = storage.readSession(storageKeys.authSession, null);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (session.role === 'Doctor') {
    return <Navigate to="/doctor-dashboard" replace />;
  }

  if (session.role === 'Patient') {
    return <Navigate to="/patient-dashboard" replace />;
  }

  return <Navigate to="/admin-dashboard" replace />;
}

export default DashboardRedirect;
