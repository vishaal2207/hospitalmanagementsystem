import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const faqs = [
  {
    id: 'records',
    question: 'How does the Hospital Management System help in managing patient records?',
    answer: (
      <>
        The system stores and manages <strong>patient details digitally, including medical history, appointments,
        prescriptions, lab reports, and billing information</strong> for easy access and efficient healthcare
        management.
      </>
    )
  },
  {
    id: 'appointments',
    question: 'Can the Hospital Management System handle appointment scheduling?',
    answer: (
      <>
        Yes, the system allows patients to <strong>book appointments online</strong> while helping doctors and staff
        manage schedules, reduce waiting time, and avoid appointment conflicts.
      </>
    )
  },
  {
    id: 'security',
    question: 'Is the Hospital Management System secure for storing medical data?',
    answer: (
      <>
        Yes, the system uses secure <strong>authentication and data protection methods</strong> to ensure that patient
        records and hospital information remain confidential and protected from unauthorized access.
      </>
    )
  }
];

function Faqpage() {
  const { isLoggedIn } = useAuth();
  const [openId, setOpenId] = useState(null);

  return (
    <>
      <Link className="floating-call" to="/contact" aria-label="Contact us">+</Link>
      <main className="page">
        <div className="page-inner">
          <header className="topbar">
            <Link className="brand" to="/" aria-label="MediCare home">
              <span className="brand-mark" aria-hidden="false"></span>
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

          <section className="content-section faq-section" id="faq">
            <div className="section-heading faq-heading">
              <span className="section-kicker">Need answers</span>
              <h2>Everything patients and staff usually ask before getting started</h2>
              <p>
                These answers are shaped around the way MediCare works, so the FAQ feels like part of the same system
                instead of a generic Bootstrap template.
              </p>
            </div>

            <div className="accordion faq-accordion" id="accordionExample">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${isOpen ? '' : 'collapsed'}`.trim()}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${faq.id}-answer`}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    {isOpen ? (
                      <div id={`${faq.id}-answer`} className="accordion-collapse">
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <footer className="site-footer" id="contact">
            <div>
              <div className="footer-brand">MediCare</div>
              <p>Modern hospital management built for clear communication, better care, and faster coordination.</p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>support@medicare.com</p>
              <p>+1 (555) 014-2026</p>
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

export default Faqpage;
