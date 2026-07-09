import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../App.css';
import HeroImage from '../Assets/Images/HeroImage.png';
import AboutUsImage from '../Assets/Images/AboutUs.png';

function Homepage() {
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

          <section className="hero-layout">
            <div className="hero-copy">
              <h1>We help people to get appointment in <span className="accent">online</span>.</h1>
              <p>
                Medicare keeps patient care simple with clean scheduling, secure records, and a calm interface
                designed for hospital teams and patients alike.
              </p>
              <div className="hero-actions">
                <Link className="button" to="/signup">Get Started</Link>
                <Link className="button-secondary" to="/login">Login</Link>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-blob" aria-hidden="true"></div>
              <img src={HeroImage} alt="Healthcare team illustration" className="hero-image" loading="lazy" />
            </div>
          </section>

          <section className="content-section about-section" id="about">
            <div className="about-layout">
              <div className="about-media" aria-hidden="true">
                <img src={AboutUsImage} alt="MediCare overview" className="about-image" loading="lazy" />
              </div>

              <div className="about-content">
                <div className="section-heading">
                  <span className="section-kicker">Know us</span>
                  <h2>Built to simplify hospital care</h2>
                  <p>
                    MediCare is a hospital management system designed to bring patients, doctors, reception teams,
                    and administrators into one clear workflow.
                  </p>
                </div>

                <div className="content-list">
                  <article className="content-point">
                    <h3>Centralized records</h3>
                    <p>Keep patient details, visits, and treatment history organized in a single secure place.</p>
                  </article>
                  <article className="content-point">
                    <h3>Faster coordination</h3>
                    <p>Reduce waiting time with smoother appointment scheduling and better staff visibility.</p>
                  </article>
                  <article className="content-point">
                    <h3>Better experience</h3>
                    <p>Give your team and your patients a calm, modern interface that feels easy to use every day.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section services-section" id="services">
            <div className="section-heading">
              <span className="section-kicker">What we do</span>
              <h2>Everything your hospital needs in one place</h2>
              <p>
                The platform supports the most important daily tasks so your staff can focus more on care and
                less on manual follow-up.
              </p>
            </div>

            <div className="content-list content-list-columns">
              <article className="content-point">
                <span className="service-icon">01</span>
                <h3>Appointment booking</h3>
                <p>Schedule visits quickly for new and returning patients with a simple flow.</p>
              </article>
              <article className="content-point">
                <span className="service-icon">02</span>
                <h3>Doctor management</h3>
                <p>Track doctors, departments, and availability for better daily coordination.</p>
              </article>
              <article className="content-point">
                <span className="service-icon">03</span>
                <h3>Patient records</h3>
                <p>Organize medical history, notes, and treatment details with clear access control.</p>
              </article>
              <article className="content-point">
                <span className="service-icon">04</span>
                <h3>Billing support</h3>
                <p>Maintain billing information and payment tracking in a clean dashboard layout.</p>
              </article>
            </div>
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

export default Homepage;
