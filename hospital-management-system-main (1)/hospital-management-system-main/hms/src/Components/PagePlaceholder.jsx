import React from 'react';
import { Link } from 'react-router-dom';

function PagePlaceholder({ title }) {
  return (
    <div className="page-inner">
      <section className="content-section">
        <div className="section-heading">
          <span className="section-kicker">MediCare</span>
          <h2>{title}</h2>
          <p>This route is connected. Add your {title.toLowerCase()} page content here.</p>
        </div>
        <Link className="button" to="/">Back to Home</Link>
      </section>
    </div>
  );
}

export default PagePlaceholder;
