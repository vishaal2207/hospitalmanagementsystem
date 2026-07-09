import React from 'react';

function AdminMetricsSection({ metrics }) {
  return (
    <section className="admin-metrics" id="overview" aria-label="Hospital metrics">
      {metrics.map((metric) => (
        <article className="admin-metric" key={metric.label}>
          <span className="admin-metric-icon">{metric.icon}</span>
          <span className="dashboard-stat-label">{metric.label}</span>
          <strong className="dashboard-stat-value">{metric.value}</strong>
          <span className="dashboard-stat-note">{metric.note}</span>
        </article>
      ))}
    </section>
  );
}

export default AdminMetricsSection;
