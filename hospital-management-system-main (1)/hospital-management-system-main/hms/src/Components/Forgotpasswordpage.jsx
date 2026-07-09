import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Forgotpasswordpage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email')?.trim() || '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setStatus('');
      return;
    }

    setError('');
    setStatus(`If an account exists for ${email}, a reset link has been sent.`);
    event.currentTarget.reset();
  }

  return (
    <main className="page auth-page">
      <div className="page-inner">
          <section className="auth-layout">
            <div className="auth-panel">
              <div className="kicker">Account help</div>
              <h1>Forgot your password?</h1>
              <p>
                Enter the email address associated with your account and we'll send instructions to reset your password.
              </p>
            </div>

            <div className="auth-card">
              <h2>Reset your password</h2>
              <p className="subtext">We'll email you a secure link. If you don't receive it, check your spam folder.</p>

              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" placeholder="you@company.com" required />
                </div>

                <div className="form-row">
                  <button className="button" type="submit">Send reset link</button>
                </div>

                <p className="form-status form-error" aria-live="polite">{error}</p>
                <p className="form-status form-success" aria-live="polite">{status}</p>

                <div className="helper">
                  <p>Remembered your password? <Link to="/login">Sign in</Link></p>
                </div>
              </form>
            </div>
          </section>
      </div>
    </main>
  );
}

export default Forgotpasswordpage;
