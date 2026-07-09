import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import AboutUsImage from '../Assets/Images/AboutUs.png';

const stats = [
  { icon: 'ER', number: '9', label: 'Bedded Emergency Unit' },
  { icon: 'NICU', number: '7', label: 'Bedded NICU' },
  { icon: 'SURG', number: '9', label: 'Bedded Surgical Unit' },
  { icon: 'ICU', number: '18', label: 'Bedded Medical ICU' }
];

const whyChoose = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#e8f5ee" />
        <path d="M20 10 C20 10, 28 14, 28 21 C28 26.5 24.4 30 20 30 C15.6 30 12 26.5 12 21 C12 14 20 10 20 10Z" fill="#2a7d4f" opacity="0.2"/>
        <path d="M17 20 L19.5 22.5 L24 17" stroke="#2a7d4f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 10 C20 10, 28 14, 28 21 C28 26.5 24.4 30 20 30 C15.6 30 12 26.5 12 21 C12 14 20 10 20 10Z" stroke="#2a7d4f" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    title: 'Excellence in Care',
    text: 'Expert professionals with advanced technology delivering world-class medical care with precision and expertise.'
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#e8f5ee" />
        <rect x="13" y="17" width="14" height="10" rx="2" fill="#2a7d4f" opacity="0.2" stroke="#2a7d4f" strokeWidth="1.5"/>
        <path d="M17 17 V14 C17 11.8 18.8 10 21 10 H20 C22.2 10 24 11.8 24 14 V17" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="22" r="2" fill="#2a7d4f"/>
        <path d="M9 13 H31" stroke="#2a7d4f" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <path d="M9 27 H31" stroke="#2a7d4f" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: 'Comprehensive Services',
    text: 'Complete healthcare solutions under one roof, from diagnostics to specialized treatments and surgeries.'
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#e8f5ee" />
        <path d="M20 11 L20 20 L26 23" stroke="#2a7d4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="9" stroke="#2a7d4f" strokeWidth="1.5" fill="none"/>
        <path d="M30 10 L33 7" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <circle cx="33" cy="7" r="2" fill="#2a7d4f" opacity="0.5"/>
      </svg>
    ),
    title: '24/7 Emergency',
    text: 'Rapid, reliable emergency response available round the clock with our dedicated trauma care team.'
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#e8f5ee" />
        <circle cx="20" cy="16" r="5" fill="#2a7d4f" opacity="0.25" stroke="#2a7d4f" strokeWidth="1.5"/>
        <path d="M12 30 C12 25.6 15.6 22 20 22 C24.4 22 28 25.6 28 30" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M16 19 C17.2 20.2 18.5 21 20 21 C21.5 21 22.8 20.2 24 19" stroke="#2a7d4f" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: 'Patient First',
    text: 'Compassionate and personalized attention ensuring every patient receives individualized care and support.'
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#e8f5ee" />
        <circle cx="20" cy="20" r="7" stroke="#2a7d4f" strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="20" r="3" fill="#2a7d4f" opacity="0.5"/>
        <path d="M20 9 L20 11" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 29 L20 31" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 20 L11 20" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M29 20 L31 20" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12.5 12.5 L14 14" stroke="#2a7d4f" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M26 26 L27.5 27.5" stroke="#2a7d4f" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M27.5 12.5 L26 14" stroke="#2a7d4f" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 26 L12.5 27.5" stroke="#2a7d4f" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Advanced Diagnostics',
    text: 'Precision through modern facilities with state-of-the-art diagnostic equipment and imaging technology.'
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#e8f5ee" />
        <rect x="11" y="14" width="18" height="14" rx="2.5" fill="#2a7d4f" opacity="0.15" stroke="#2a7d4f" strokeWidth="1.5"/>
        <path d="M15 14 V12 C15 10.9 15.9 10 17 10 H23 C24.1 10 25 10.9 25 12 V14" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M15 22 H25" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 25 H21" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="27" cy="28" r="5" fill="#2a7d4f" opacity="0.15"/>
        <path d="M24.5 28 L26.2 29.7 L29.5 26" stroke="#2a7d4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Affordable & Transparent',
    text: 'Quality care at fair pricing with transparent billing, making healthcare accessible to everyone.'
  }
];

function Aboutpage() {
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

          <section className="content-section about-section" id="about">
            <div className="about-layout">
              <div className="about-media" aria-hidden="true">
                <img src={AboutUsImage} alt="MediCare overview" className="about-image" loading="lazy" />
              </div>

              <div className="about-content">
                <div className="section-heading">
                  <span className="section-kicker">Who we are</span>
                  <h2>A hospital platform shaped around real workflows</h2>
                  <p>
                    MediCare helps hospital teams manage patient journeys from registration to discharge with a cleaner
                    process, fewer manual steps, and clearer communication between departments.
                  </p>
                </div>

                <div className="about-prose">
                  <p>
                    MediCare is a hospital management platform built around the way real hospital teams actually
                    work. From the moment a patient arrives at reception to the time they're discharged, every
                    step is supported by tools that reduce manual effort and keep information accurate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section stats-section-container">
            <div className="stats-section">
              <div className="section-kicker">Specialized Care Units</div>
              <h2>Advanced Care Facilities</h2>
              <p>State-of-the-art specialized units designed for comprehensive patient care</p>
              <div className="stats-grid">
                {stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section mission-vision-container">
            <div className="mission-vision">
              <div className="mission">
                <span className="mission-kicker">MISSION</span>
                <h3>Our Mission</h3>
                <p>
                  To deliver comprehensive, compassionate, and accessible healthcare services that uphold the highest
                  standards of medical excellence, while nurturing a healing environment that honors the dignity, trust,
                  and well-being of every individual.
                </p>
                <div className="underline"></div>
              </div>
              <div className="vision">
                <span className="vision-kicker">VISION</span>
                <h3>Our Vision</h3>
                <p>
                  To lead healthcare innovation by setting new benchmarks for excellence and patient satisfaction, both
                  within our community and beyond.
                </p>
                <div className="underline"></div>
              </div>
            </div>
          </section>

          <section className="content-section why-choose-container">
            <div className="why-choose-us">
              <div className="why-choose-header">
                <div className="section-kicker excellence-kicker">Excellence in Healthcare</div>
                <h2>Why Choose MediCare?</h2>
                <div className="header-divider">Care</div>
                <p>
                  Discover the reasons why thousands of patients trust us with their health and well-being. Our
                  commitment to excellence, advanced technology, and compassionate care sets us apart.
                </p>
              </div>

              <ul className="why-grid">
                {whyChoose.map((item) => (
                  <li key={item.title}>
                    <div className="why-icon">{item.icon}</div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
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

export default Aboutpage;
