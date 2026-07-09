import React, { createContext, useState, useContext } from 'react';
import { storage, storageKeys } from '../Utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(storage.readSession(storageKeys.authSession)));

  const login = (sessionData = {}) => {
    storage.writeSession(storageKeys.authSession, sessionData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    storage.removeSession(storageKeys.authSession);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
