import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { storage, storageKeys } from '../Utils/storage';
import { api } from '../Utils/api';

const initialErrors = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

function Contactpage() {
  const { isLoggedIn } = useAuth();
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const draft = storage.readSession(storageKeys.contactDraft, null);
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

      storage.writeSession(storageKeys.contactDraft, nextFormData);
      return nextFormData;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = {
      name: form.get('name')?.trim() ? '' : 'Please enter your full name.',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.get('email') || '') ? '' : 'Please enter a valid email address.',
      subject: form.get('subject')?.trim() ? '' : 'Please enter a subject.',
      message: form.get('message')?.trim() ? '' : 'Please write your message.'
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus('');
      return;
    }

    const record = {
      name: form.get('name')?.trim() || '',
      email: form.get('email')?.trim() || '',
      subject: form.get('subject')?.trim() || '',
      message: form.get('message')?.trim() || ''
    };

    try {
      await api.createContact(record);
    } catch (apiError) {
      const messages = storage.readLocal(storageKeys.contactMessages, []);
      storage.writeLocal(storageKeys.contactMessages, [...messages, record]);
    }

    storage.removeSession(storageKeys.contactDraft);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setStatus('Message sent successfully. Our team will reply as soon as possible.');
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
              <div className="kicker">Get in touch</div>
              <h1>Contact MediCare.</h1>
              <p>
                Reach our team for appointment support, patient account help, billing questions, or general hospital
                information.
              </p>
              <div className="hero-actions">
                <Link className="button-secondary" to="/appointment">Book appointment</Link>
              </div>
            </div>

            <section className="auth-card" aria-labelledby="contact-title">
              <h2 id="contact-title">Send a message</h2>
              <p className="subtext">Use the form below and our team will reply as soon as possible.</p>

              <form className="form" id="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-describedby="name-error"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <small className="field-error" id="name-error" aria-live="polite">{errors.name}</small>
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-describedby="email-error"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <small className="field-error" id="email-error" aria-live="polite">{errors.email}</small>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    aria-describedby="subject-error"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <small className="field-error" id="subject-error" aria-live="polite">{errors.subject}</small>
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Write your message here"
                    aria-describedby="message-error"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <small className="field-error" id="message-error" aria-live="polite">{errors.message}</small>
                </div>

                <button className="button" type="submit">Send message</button>
                <p className="form-status form-success" id="form-status" aria-live="polite">{status}</p>
              </form>
            </section>
          </section>

          <footer className="site-footer" id="contact-details">
            <div>
              <div className="footer-brand">MediCare</div>
              <p>Modern hospital management built for clear communication, better care, and faster coordination.</p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>Use this page to reach the hospital team.</p>
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

export default Contactpage;
