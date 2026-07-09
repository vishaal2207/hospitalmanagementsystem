import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';

function Loginpage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const rememberedEmail = storage.readLocal(storageKeys.rememberedEmail, '');
    setEmail(rememberedEmail);
    setRemember(Boolean(rememberedEmail));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError('Please enter a valid email address.');
      setStatus('');
      return;
    }

    if (!passwordValue) {
      setError('Please enter your password.');
      setStatus('');
      return;
    }

    const localUsers = storage.readLocal(storageKeys.users, []);
    let userRecord = localUsers.find((user) => user.email === emailValue && user.password === passwordValue) || null;

    if (!userRecord) {
      try {
        const response = await api.login({ email: emailValue, password: passwordValue });
        userRecord = response.data;
      } catch (apiError) {
        userRecord = null;
      }
    }

    if (!userRecord) {
      setError('No matching account was found. Please sign up first or check your password.');
      setStatus('');
      return;
    }

    if (remember) {
      storage.writeLocal(storageKeys.rememberedEmail, emailValue);
    } else {
      storage.removeLocal(storageKeys.rememberedEmail);
    }

    setError('');
    setStatus('Login successful. Redirecting...');
    login({
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      email: userRecord.email,
      role: userRecord.role
    });
    const destination = userRecord.role === 'Doctor'
      ? '/doctor-dashboard'
      : userRecord.role === 'Patient'
        ? '/patient-dashboard'
        : '/admin-dashboard';
    setTimeout(() => navigate(destination), 800);
  }

  return (
    <main className="page auth-page">
      <div className="page-inner">
          <section className="auth-layout">
            <div className="auth-panel">
              <div className="kicker">Trusted hospital management platform</div>
              <h1>Welcome back to MediCare.</h1>
              <p>
                Sign in to continue managing appointments, patient records, and your hospital workflow with a calm,
                consistent interface.
              </p>
              <div className="hero-actions">
                <Link className="button-secondary" to="/signup">Create account</Link>
              </div>
            </div>

            <section className="auth-card" aria-labelledby="login-title">
              <h2 id="login-title">Login</h2>
              <p className="subtext">Enter your details to access the Medicare dashboard.</p>

              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@hospital.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox" htmlFor="remember">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot">Forgot password?</Link>
                </div>

                <button className="button" type="submit">Login</button>
                <p className="form-status form-error" aria-live="polite">{error}</p>
                <p className="form-status form-success" aria-live="polite">{status}</p>
              </form>

              <p className="helper">
                New to MediCare? <Link className="ghost-link" to="/signup">Create your account</Link>
              </p>
            </section>
          </section>
      </div>
    </main>
  );
}

export default Loginpage;
