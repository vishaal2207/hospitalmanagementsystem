import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { api } from '../Utils/api';

function Doctorspage() {
  const { isLoggedIn } = useAuth();
  const [liveDoctors, setLiveDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api.getDoctors()
      .then((response) => {
        if (isMounted) setLiveDoctors(response.data || []);
      })
      .catch(() => {
        if (isMounted) setLiveDoctors([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

          <section className="content-section doctors-section" id="doctors">
            <div className="section-heading">
              <span className="section-kicker">Our doctors</span>
              <h2>Meet our expert medical team</h2>
              <p>
                A dedicated team of highly qualified physicians and specialists committed to providing compassionate,
                excellent care to every patient.
              </p>
            </div>

            {isLoading && <p className="doctor-status">Loading doctor profiles...</p>}
            {!isLoading && liveDoctors.length === 0 ? (
              <p className="doctor-status">No doctor profiles have been added yet.</p>
            ) : (
              <div className="doctors-grid">
                {liveDoctors.map((doctor) => (
                <div className="doctor-card" key={doctor._id || doctor.name}>
                  {doctor.badge ? (
                    <div className={`doctor-badge ${doctor.badge === 'CEO' ? 'ceo-badge' : ''}`}>
                      {doctor.badge}
                    </div>
                  ) : null}
                  <div className="doctor-image">
                    {doctor.imageUrl ? <img src={doctor.imageUrl} alt={doctor.name} loading="lazy" /> : null}
                  </div>
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <p className="doctor-role">{doctor.role || doctor.nextSlot || 'Consultant'}</p>
                  <p className="doctor-cred">{doctor.credentials || doctor.contact || 'Available by appointment'}</p>
                </div>
                ))}
              </div>
            )}
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

export default Doctorspage;
