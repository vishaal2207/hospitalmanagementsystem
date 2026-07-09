import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboardHero() {
  return (
    <section className="admin-hero">
      <div>
        <span className="admin-date">Live operations summary</span>
        <h2>Hospital control center</h2>
        <p>Track the day&apos;s most important clinical, operational, and financial signals.</p>
      </div>
      <div className="admin-hero-actions">
        <Link className="button" to="/admin-dashboard/appointments">Review queue</Link>
      </div>
    </section>
  );
}

export default AdminDashboardHero;
