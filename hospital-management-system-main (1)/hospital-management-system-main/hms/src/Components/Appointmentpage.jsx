import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';

function Appointmentpage() {
  const { isLoggedIn } = useAuth();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    department: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    const draft = storage.readSession(storageKeys.appointmentDraft, null);
    if (draft) {
      setFormData((current) => ({
        ...current,
        ...draft
      }));
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => {
      const nextFormData = {
        ...current,
        [name]: value
      };

      storage.writeSession(storageKeys.appointmentDraft, nextFormData);
      return nextFormData;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const submission = {
      patientName: form.get('patientName')?.trim() || '',
      phone: form.get('phone')?.trim() || '',
      department: form.get('department')?.trim() || '',
      date: form.get('date') || '',
      notes: form.get('notes')?.trim() || ''
    };

    try {
      await api.createAppointment(submission);
    } catch (apiError) {
      const requests = storage.readLocal(storageKeys.appointmentRequests, []);
      storage.writeLocal(storageKeys.appointmentRequests, [...requests, submission]);
    }

    storage.removeSession(storageKeys.appointmentDraft);
    setFormData({
      patientName: '',
      phone: '',
      department: '',
      date: '',
      notes: ''
    });
    setMessage('Appointment request submitted. Our team will confirm your booking shortly.');
    event.currentTarget.reset();
  }

  return (
    <>
      <Link className="floating-call" to="/contact" aria-label="Contact us">+</Link>
      <main className="page">
        <div className="page-inner">
          <header className="topbar">
            <Link className="brand" to="/" aria-label="MediCare home">
              <span className="brand-mark" aria-hidden="true"></span>
              <span className="brand-name">MediCare</span>
            </Link>

            <nav className="nav" aria-label="Primary">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/doctors">Doctors</NavLink>
              <NavLink to="/appointment">Appointment</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {isLoggedIn && <NavLink className="nav-icon" to="/profile" aria-label="Profile">+</NavLink>}
            </nav>
          </header>

          <section className="auth-layout">
            <div className="auth-panel">
              <div className="kicker">Book a visit</div>
              <h1>Schedule your appointment with MediCare.</h1>
              <p>
                Choose your department, preferred doctor, and the time that works best for you. The form below gives
                you a quick way to request a visit.
              </p>
            </div>

            <section className="auth-card" aria-labelledby="appointment-title">
              <h2 id="appointment-title">Appointment request</h2>
              <p className="subtext">Fill in the details and our team will confirm your booking.</p>

              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="patient-name">Patient name</label>
                    <input id="patient-name" name="patientName" type="text" placeholder="Full name" required value={formData.patientName} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" name="phone" type="tel" placeholder="Phone number" required value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="department">Department</label>
                    <input id="department" name="department" type="text" placeholder="Department" required value={formData.department} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="date">Preferred date</label>
                    <input id="date" name="date" type="date" required value={formData.date} onChange={handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="notes">Notes</label>
                  <input id="notes" name="notes" type="text" placeholder="Brief reason for visit" value={formData.notes} onChange={handleChange} />
                </div>

                <button className="button" type="submit">Request appointment</button>
                <p className="form-status form-success" aria-live="polite">{message}</p>
              </form>
            </section>
          </section>

          <footer className="site-footer" id="contact">
            <div>
              <div className="footer-brand">MediCare</div>
              <p>Modern hospital management built for clear communication, better care, and faster coordination.</p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>Use the contact page to reach the hospital team.</p>
            </div>
            <div>
              <h3>Quick Links</h3>
              <p><Link to="/">Home</Link></p>
              <p><Link to="/about">About Us</Link></p>
              <p><Link to="/services">Services</Link></p>
              <p><Link to="/doctors">Doctors</Link></p>
              <p><Link to="/appointment">Appointment</Link></p>
              <p><Link to="/faq">FAQ</Link></p>
              <p><Link to="/contact">Contact</Link></p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

export default Appointmentpage;
