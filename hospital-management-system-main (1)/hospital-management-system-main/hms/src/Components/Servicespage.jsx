import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const serviceCards = [
  {
    number: '01',
    title: 'Front desk intake',
    text: 'Capture patient details quickly so the reception team can move smoothly from check-in to care.'
  },
  {
    number: '02',
    title: 'Department planning',
    text: 'Organize departments, doctor availability, and visit flow so scheduling stays predictable.'
  },
  {
    number: '03',
    title: 'Clinical records',
    text: 'Keep treatment notes and history together so doctors can review the right information faster.'
  },
  {
    number: '04',
    title: 'Billing follow-up',
    text: 'Track invoice status and payment updates without losing sight of the patient visit flow.'
  }
];

const featureSections = [
  {
    kicker: 'Core Features',
    title: 'Patient Management',
    divider: 'Care',
    text: 'Streamline patient intake, records, and history management with a unified platform designed for efficient care delivery.',
    items: [
      {
        icon: '01',
        title: 'Patient Intake',
        text: 'Capture comprehensive patient information quickly during check-in with automated form validation and secure data entry.'
      },
      {
        icon: '02',
        title: 'Digital Records',
        text: 'Keep all patient history, medical notes, and treatment records organized in one secure location accessible to care teams.'
      },
      {
        icon: '03',
        title: 'Privacy & Security',
        text: 'Support role-based access controls and encrypted storage for sensitive patient information.'
      }
    ]
  },
  {
    kicker: 'Scheduling Excellence',
    title: 'Appointment Scheduling',
    divider: 'Schedule',
    text: 'Optimize scheduling workflow with intelligent booking, real-time availability, and automated reminders for better patient flow.',
    items: [
      {
        icon: '01',
        title: 'Smart Scheduling',
        text: 'Intelligently allocate time slots based on doctor availability, department capacity, and patient needs for optimal flow.'
      },
      {
        icon: '02',
        title: 'Automated Reminders',
        text: 'Send SMS and email reminders to reduce no-shows and keep patients informed about upcoming appointments.'
      },
      {
        icon: '03',
        title: 'Wait Time Reduction',
        text: 'Minimize patient waiting times with real-time scheduling updates and prioritization based on clinical urgency.'
      }
    ]
  },
  {
    kicker: 'Team Coordination',
    title: 'Doctor & Staff Management',
    divider: 'Team',
    text: 'Coordinate your care team efficiently with centralized staff profiles, availability tracking, and department organization.',
    items: [
      {
        icon: '01',
        title: 'Staff Profiles',
        text: 'Maintain comprehensive doctor and staff profiles with specializations, credentials, and availability for better coordination.'
      },
      {
        icon: '02',
        title: 'Department Management',
        text: 'Organize departments, assign resources, and manage team workload to ensure balanced distribution of patient care.'
      },
      {
        icon: '03',
        title: 'Performance Tracking',
        text: 'Monitor staff performance metrics, patient satisfaction, and department efficiency with integrated reporting tools.'
      }
    ]
  }
];

function Servicespage() {
  const { isLoggedIn } = useAuth();
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

          <section className="content-section services-section" id="services">
            <div className="section-heading">
              <span className="section-kicker">How we help</span>
              <h2>Tools that support the daily pace of a hospital</h2>
              <p>
                MediCare is built to reduce friction in common hospital tasks, from handling patient visits to
                coordinating staff and keeping records organized.
              </p>
            </div>

            <div className="services-grid">
              {serviceCards.map((service) => (
                <article className="service-card" key={service.title}>
                  <span className="service-icon">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </section>

          {featureSections.map((section) => (
            <section className="content-section why-choose-container" key={section.title}>
              <div className="why-choose-us">
                <div className="why-choose-header">
                  <div className="section-kicker excellence-kicker">{section.kicker}</div>
                  <h2>{section.title}</h2>
                  <div className="header-divider">{section.divider}</div>
                  <p>{section.text}</p>
                </div>

                <ul className="why-grid">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <div className="why-icon">{item.icon}</div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

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

export default Servicespage;
