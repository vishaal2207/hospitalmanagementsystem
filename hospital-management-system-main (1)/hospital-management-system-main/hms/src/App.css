.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


* {
    box-sizing: border-box;
}

:root {
    --bg: #f8f8f3;
    --surface: rgba(255, 255, 255, 0.92);
    --surface-strong: #ffffff;
    --ink: #111111;
    --muted: #5f6e64;
    --dark: #0f2a1d;
    --dark-2: #173b2b;
    --mid: #375534;
    --sage: #6b9071;
    --soft: #aec3b0;
    --paper: #e3eed4;
    --ring: rgba(15, 42, 29, 0.12);
    --shadow: 0 22px 55px rgba(15, 42, 29, 0.14);
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    min-height: 100vh;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: var(--ink);
    background:
        radial-gradient(circle at 18% 14%, rgba(174, 195, 176, 0.34), transparent 18%),
        radial-gradient(circle at 78% 30%, rgba(107, 144, 113, 0.12), transparent 15%),
        linear-gradient(180deg, #fdfdf9 0%, #f3f6ef 100%);
}

body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(15, 42, 29, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 42, 29, 0.03) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), transparent 90%);
}

img {
    max-width: 100%;
    display: block;
}

button,
input,
select {
    font: inherit;
}

.page {
    min-height: 100vh;
    padding: 20px 20px 32px;
}

.page-inner {
    width: min(1040px, 100%);
    margin: 0 auto;
    min-height: calc(100vh - 52px);
}

.topbar {
    width: min(1040px, 100%);
    margin: 16px auto 42px;
    padding: 14px 16px 14px 18px;
    border-radius: 999px;
    background: linear-gradient(135deg, #0f2a1d, #244b35 55%, #173b2b 100%);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: sticky;
    top: 16px;
    z-index: 50;
    backdrop-filter: blur(12px);
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    color: #ffffff;
    text-decoration: none;
    min-width: fit-content;
}

.brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 30% 30%, #6b9071 0%, #375534 58%, #0f2a1d 100%);
    box-shadow: inset 0 0 0 6px rgba(174, 195, 176, 0.18);
    position: relative;
    flex: 0 0 auto;
}

.brand-mark::before {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 5px;
    background: #aec3b0;
    clip-path: polygon(40% 0, 60% 0, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0 60%, 0 40%, 40% 40%);
}

.brand-name {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: -0.03em;
}

.nav {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.nav a,
.nav .nav-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 20px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--ink);
    background: rgba(227, 238, 212, 0.86);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.45);
    transition: transform 0.2s ease, filter 0.2s ease;
}

.nav a:hover,
.nav .nav-icon:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
}

.nav .nav-icon {
    width: 44px;
    padding: 0;
    font-size: 1.1rem;
}

.nav .active {
    background: #f2f4ed;
}

.floating-call {
    position: fixed;
    right: 22px;
    bottom: 22px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #0f2a1d, #375534);
    color: #f7f9f2;
    text-decoration: none;
    box-shadow: 0 18px 35px rgba(15, 42, 29, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.18);
    z-index: 120;
    font-size: 1.25rem;
}

.floating-call:hover {
    transform: translateY(-2px);
}

.hero-layout {
    /* width: min(980px, 100%); */
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 480px;
    align-items: center;
    gap: clamp(20px, 5vw, 48px);
    padding: 24px 0 40px;
    justify-content: center;
}

.hero-copy {
    padding-left: 0;
    padding-right: 8px;
    justify-self: start;
}

.hero-copy h1 {
    margin: 0;
    font-size: clamp(3rem, 5.6vw, 4.9rem);
    line-height: 1.06;
    letter-spacing: -0.06em;
    font-weight: 700;
    max-width: 11ch;
}

.hero-copy .accent {
    color: var(--sage);
}

.hero-copy p {
    margin: 22px 0 0;
    max-width: 48ch;
    font-size: 1rem;
    line-height: 1.75;
    color: #222;
}

.hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 28px;
}

.button,
.button-secondary {
    appearance: none;
    border: none;
    border-radius: 999px;
    min-height: 52px;
    padding: 0 24px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
}

.button {
    background: linear-gradient(135deg, #0f2a1d, #375534);
    color: #f7f9f2;
    box-shadow: 0 16px 30px rgba(15, 42, 29, 0.16);
}

.button-secondary {
    background: rgba(255, 255, 255, 0.74);
    color: var(--dark);
    border: 1px solid rgba(15, 42, 29, 0.08);
}

.button:hover,
.button-secondary:hover {
    transform: translateY(-1px);
}

.button-ghost {
    min-height: 44px;
    padding: 0 18px;
    background: rgba(227, 238, 212, 0.86);
    color: var(--dark);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.hero-blob {
    position: absolute;
    width: min(94%, 470px);
    aspect-ratio: 1;
    border-radius: 43% 57% 58% 42% / 42% 41% 59% 58%;
    background: linear-gradient(180deg, rgba(223, 236, 209, 0.9), rgba(174, 195, 176, 0.32));
    filter: blur(0.2px);
    transform: translate(15%, -10%);
}

.hero-image {
    position: relative;
    z-index: 1;
    width: min(84%, 520px);
    max-width: 100%;
    height: auto;
    border-radius: 14px;
    object-fit: cover;
    transform: translate(35%, -10%);
}


.auth-layout {
    width: min(1120px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.86fr);
    gap: 32px;
    align-items: center;
    padding: 14px 0 42px;
    min-height: calc(100vh - 210px);
}

.auth-page .page-inner {
    display: grid;
    align-items: center;
    min-height: calc(100vh - 52px);
}

.auth-page .auth-layout {
    min-height: auto;
    padding: 42px 0;
}

.auth-panel {
    padding-left: clamp(4px, 2vw, 28px);
}

.kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 999px;
    background: rgba(174, 195, 176, 0.24);
    color: var(--mid);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.auth-panel h1 {
    margin: 0;
    font-size: clamp(2.5rem, 4.8vw, 4.2rem);
    line-height: 1.04;
    letter-spacing: -0.06em;
    max-width: 10ch;
}

.auth-panel p {
    margin: 18px 0 0;
    max-width: 48ch;
    font-size: 1rem;
    line-height: 1.75;
    color: #222;
}

.auth-card {
    background: var(--surface);
    border: 1px solid var(--ring);
    border-radius: 30px;
    box-shadow: var(--shadow);
    padding: 30px;
}

.dashboard-layout {
    align-items: start;
}

.dashboard-panel {
    position: sticky;
    top: 118px;
}

.dashboard-card {
    display: grid;
    gap: 22px;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

.dashboard-stat,
.dashboard-module {
    background: rgba(243, 246, 239, 0.9);
    border: 1px solid rgba(15, 42, 29, 0.08);
    border-radius: 22px;
    padding: 18px;
}

.dashboard-stat {
    display: grid;
    gap: 8px;
}

.dashboard-stat-label,
.dashboard-module-title {
    color: var(--mid);
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
}

.dashboard-stat-value {
    color: var(--dark);
    font-size: 2rem;
    line-height: 1;
    letter-spacing: -0.04em;
}

.dashboard-stat-note,
.dashboard-module p {
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
}

.dashboard-section {
    display: grid;
    gap: 14px;
}

.dashboard-section h3 {
    margin: 0;
    font-size: 1.15rem;
    letter-spacing: -0.03em;
}

.dashboard-list {
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 10px;
    color: var(--ink);
    line-height: 1.6;
}

.schedule-list {
    list-style: none;
    padding-left: 0;
}

.schedule-list li {
    display: grid;
    gap: 4px;
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.74);
    border: 1px solid rgba(15, 42, 29, 0.08);
}

.schedule-list strong {
    color: var(--dark);
}

.schedule-list em {
    color: var(--muted);
    font-style: normal;
}

.dashboard-modules {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
}

.admin-page-inner {
    width: min(1240px, 100%);
}

.dashboard-navbar {
    width: min(1240px, 100%);
    margin: 16px auto 28px;
    padding: 12px 14px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(15, 42, 29, 0.1);
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
    position: sticky;
    top: 16px;
    z-index: 60;
    backdrop-filter: blur(14px);
}

.dashboard-navbar-brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: var(--dark);
    text-decoration: none;
    min-width: fit-content;
}

.dashboard-navbar-brand .brand-mark {
    width: 40px;
    height: 40px;
}

.dashboard-navbar-brand strong,
.dashboard-navbar-brand small {
    display: block;
}

.dashboard-navbar-brand strong {
    font-size: 1.15rem;
    letter-spacing: -0.03em;
}

.dashboard-navbar-brand small {
    margin-top: 2px;
    color: var(--sage);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.dashboard-navbar-links,
.dashboard-navbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.dashboard-navbar-links {
    justify-content: center;
    flex-wrap: wrap;
}

.dashboard-navbar-actions {
    justify-content: flex-end;
}

.dashboard-navbar-links a,
.dashboard-navbar-home {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border-radius: 999px;
    color: var(--dark);
    text-decoration: none;
    background: rgba(227, 238, 212, 0.74);
    border: 1px solid rgba(15, 42, 29, 0.06);
    font-weight: 700;
    transition: background-color 0.08s ease, color 0.08s ease, border-color 0.08s ease;
}

.dashboard-navbar-links a:hover,
.dashboard-navbar-home:hover {
    background: rgba(174, 195, 176, 0.34);
}

.dashboard-navbar-links .active,
.admin-menu .active {
    background: linear-gradient(135deg, #0f2a1d, #375534);
    color: #f7f9f2;
}

.admin-shell {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 24px;
    align-items: start;
    padding-bottom: 44px;
}

.admin-sidebar {
    position: sticky;
    top: 118px;
    display: grid;
    gap: 20px;
    padding: 24px;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(227, 238, 212, 0.62));
    border: 1px solid rgba(15, 42, 29, 0.1);
    box-shadow: var(--shadow);
}

.admin-sidebar h1 {
    margin: 0;
    color: var(--dark);
    font-size: clamp(2rem, 3vw, 2.7rem);
    line-height: 1;
    letter-spacing: -0.06em;
}

.admin-sidebar p {
    margin: 14px 0 0;
    color: var(--muted);
    line-height: 1.7;
}

.admin-menu {
    display: grid;
    gap: 8px;
}

.admin-menu a {
    min-height: 42px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    border-radius: 14px;
    color: var(--dark);
    text-decoration: none;
    background: rgba(255, 255, 255, 0.62);
    border: 1px solid rgba(15, 42, 29, 0.06);
    font-weight: 700;
}

.admin-menu a:hover {
    background: rgba(174, 195, 176, 0.28);
}

.admin-sidebar-card {
    padding: 18px;
    border-radius: 20px;
    background: linear-gradient(135deg, #0f2a1d, #375534);
    color: #f7f9f2;
}

.admin-sidebar-card span,
.admin-date,
.admin-card-heading span {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.admin-sidebar-card strong {
    display: block;
    margin-top: 8px;
    font-size: 2rem;
    letter-spacing: -0.04em;
}

.admin-sidebar-card p {
    margin: 8px 0 0;
    color: rgba(247, 249, 242, 0.78);
}

.admin-content {
    display: grid;
    gap: 18px;
}

.admin-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 28px;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(15, 42, 29, 0.98), rgba(55, 85, 52, 0.92));
    color: #f7f9f2;
    box-shadow: var(--shadow);
}

.admin-date {
    color: rgba(227, 238, 212, 0.82);
}

.admin-hero h2 {
    margin: 8px 0 0;
    font-size: clamp(2rem, 3.4vw, 3.2rem);
    line-height: 1;
    letter-spacing: -0.06em;
}

.admin-hero p {
    margin: 12px 0 0;
    color: rgba(247, 249, 242, 0.78);
    line-height: 1.7;
}

.admin-hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.admin-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
}

.admin-metric,
.admin-card {
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(15, 42, 29, 0.08);
    border-radius: 22px;
    box-shadow: 0 12px 30px rgba(15, 42, 29, 0.06);
}

.admin-metric {
    display: grid;
    gap: 8px;
    padding: 18px;
    position: relative;
    overflow: hidden;
}

.admin-metric-icon {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: linear-gradient(135deg, #e3eed4, #aec3b0);
    color: var(--dark);
    font-size: 0.78rem;
    font-weight: 900;
}

.admin-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.9fr);
    gap: 18px;
}

.admin-card {
    padding: 22px;
    display: grid;
    gap: 18px;
}

.admin-card-wide {
    grid-column: span 1;
}

.admin-card-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
}

.admin-card-heading h3 {
    margin: 0;
    color: var(--dark);
    font-size: 1.25rem;
    letter-spacing: -0.03em;
}

.admin-card-heading span {
    color: var(--sage);
    text-align: right;
}

.admin-card-heading a {
    color: var(--sage);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-align: right;
    text-decoration: none;
    text-transform: uppercase;
}

.admin-card-heading a:hover {
    color: var(--dark);
    text-decoration: underline;
}

.department-list,
.staff-list {
    display: grid;
    gap: 12px;
}

.department-row,
.staff-row {
    display: grid;
    gap: 10px;
    padding: 14px;
    border-radius: 18px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.department-row {
    grid-template-columns: minmax(150px, 1fr) minmax(120px, 1.2fr) auto;
    align-items: center;
}

.department-row strong,
.staff-row strong,
.resource-grid strong,
.admin-table-row strong {
    color: var(--dark);
}

.department-row span,
.staff-row span,
.staff-row p,
.resource-grid span {
    color: var(--muted);
}

.department-row em,
.admin-table-row em {
    justify-self: end;
    min-width: 92px;
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(174, 195, 176, 0.28);
    color: var(--mid);
    font-size: 0.82rem;
    font-style: normal;
    font-weight: 800;
    text-align: center;
}

.load-track {
    height: 10px;
    border-radius: 999px;
    background: rgba(15, 42, 29, 0.09);
    overflow: hidden;
}

.load-track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #6b9071, #375534);
}

.admin-alert-list,
.report-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.admin-alert-list {
    display: grid;
    gap: 12px;
}

.admin-alert-list li {
    display: grid;
    gap: 8px;
    padding: 14px;
    border-radius: 18px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.admin-alert-list span {
    width: fit-content;
    padding: 5px 9px;
    border-radius: 999px;
    background: rgba(107, 144, 113, 0.18);
    color: var(--mid);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
}

.admin-alert-list p {
    margin: 0;
    color: var(--ink);
    line-height: 1.55;
}

.admin-table {
    display: grid;
    gap: 8px;
    overflow-x: auto;
}

.admin-table-head,
.admin-table-row {
    display: grid;
    grid-template-columns: 72px minmax(130px, 1.1fr) minmax(110px, 1fr) minmax(130px, 1fr) 110px;
    gap: 12px;
    align-items: center;
    min-width: 680px;
}

.admin-table-head {
    padding: 0 14px;
    color: var(--sage);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.admin-table-row {
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
    color: var(--muted);
}

.staff-row {
    grid-template-columns: minmax(0, 1fr) auto;
}

.staff-row b {
    color: var(--mid);
    font-size: 1.25rem;
}

.staff-row p {
    grid-column: 1 / -1;
    margin: 0;
    line-height: 1.5;
}

.resource-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.resource-grid div {
    display: grid;
    gap: 8px;
    min-height: 96px;
    padding: 16px;
    border-radius: 18px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.admin-feature-page {
    display: grid;
    gap: 18px;
    padding-bottom: 44px;
}

.admin-feature-hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding: 32px;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(15, 42, 29, 0.98), rgba(55, 85, 52, 0.92));
    color: #f7f9f2;
    box-shadow: var(--shadow);
}

.admin-feature-hero h1 {
    margin: 8px 0 0;
    font-size: clamp(2.2rem, 4vw, 3.8rem);
    line-height: 1;
    letter-spacing: -0.06em;
}

.admin-feature-hero p {
    margin: 14px 0 0;
    max-width: 72ch;
    color: rgba(247, 249, 242, 0.78);
    line-height: 1.7;
}

.admin-feature-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
}

.admin-feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.admin-feature-list {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.admin-feature-list li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    padding: 14px;
    border-radius: 18px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.admin-feature-list li span {
    width: 10px;
    height: 10px;
    margin-top: 8px;
    border-radius: 999px;
    background: var(--sage);
}

.admin-feature-list p {
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
}

.admin-module-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
    gap: 18px;
}

.admin-module-wide {
    grid-row: span 2;
}

.admin-module-table {
    display: grid;
    gap: 8px;
    overflow-x: auto;
}

.admin-module-table-head,
.admin-module-table-row {
    display: grid;
    gap: 12px;
    align-items: center;
    min-width: 720px;
}

.admin-module-table-head {
    padding: 0 14px;
    color: var(--sage);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.admin-module-table-row {
    padding: 14px;
    border-radius: 16px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
    color: var(--muted);
    line-height: 1.45;
}

.admin-module-table-row span:first-child {
    color: var(--dark);
    font-weight: 800;
}

.department-directory {
    display: grid;
    gap: 14px;
}

.department-directory-card {
    display: grid;
    gap: 14px;
    padding: 18px;
    border-radius: 20px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.department-directory-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
}

.department-directory-head strong {
    display: block;
    color: var(--dark);
    font-size: 1.15rem;
}

.department-directory-head span {
    display: block;
    margin-top: 4px;
    color: var(--muted);
}

.department-directory-head em {
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(174, 195, 176, 0.28);
    color: var(--mid);
    font-size: 0.82rem;
    font-style: normal;
    font-weight: 800;
}

.admin-mini-grid {
    display: grid;
    grid-template-columns: minmax(120px, 0.6fr) minmax(0, 1.4fr);
    gap: 12px;
}

.admin-mini-grid div {
    display: grid;
    gap: 6px;
    padding: 12px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.72);
}

.admin-mini-grid b {
    color: var(--dark);
}

.admin-mini-grid span {
    color: var(--muted);
    line-height: 1.5;
}

.admin-compact-list {
    display: grid;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.admin-compact-list li {
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
    color: var(--muted);
    line-height: 1.5;
}

.admin-lane-list {
    display: grid;
    gap: 10px;
}

.admin-lane-list div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px;
    border-radius: 14px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.admin-lane-list strong {
    color: var(--dark);
}

.admin-lane-list span {
    color: var(--muted);
    text-align: right;
}

.admin-action-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.admin-action-row button {
    min-height: 32px;
    padding: 0 10px;
    border: 1px solid rgba(15, 42, 29, 0.12);
    border-radius: 999px;
    background: rgba(227, 238, 212, 0.9);
    color: var(--dark);
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
}

.admin-action-row button:hover {
    background: rgba(174, 195, 176, 0.4);
}

.admin-crud-form {
    display: grid;
    gap: 10px;
}

.admin-crud-form input,
.admin-crud-form select,
.admin-crud-form textarea {
    width: 100%;
    min-height: 44px;
    border-radius: 14px;
    border: 1px solid rgba(15, 42, 29, 0.12);
    background: rgba(255, 255, 255, 0.88);
    color: var(--ink);
    padding: 10px 12px;
    font: inherit;
    outline: none;
}

.admin-crud-form textarea {
    min-height: 96px;
    resize: vertical;
}

.admin-crud-form input:focus,
.admin-crud-form select:focus,
.admin-crud-form textarea:focus {
    border-color: rgba(55, 85, 52, 0.55);
    box-shadow: 0 0 0 4px rgba(174, 195, 176, 0.3);
}

.doctor-dashboard {
    display: grid;
    gap: 18px;
    padding-bottom: 44px;
}

.doctor-navbar .dashboard-navbar-links .active,
.doctor-navbar .admin-menu .active {
    background: linear-gradient(135deg, #0f2a1d, #6b9071);
}

.doctor-hero {
    background: linear-gradient(135deg, rgba(15, 42, 29, 0.98), rgba(107, 144, 113, 0.92));
}

.doctor-overview-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.9fr);
    gap: 18px;
}

.doctor-table-five {
    grid-template-columns: 80px minmax(130px, 1fr) minmax(180px, 1.2fr) minmax(90px, 0.7fr) minmax(110px, 0.8fr) !important;
}

.doctor-consult-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

.doctor-consult-grid div {
    display: grid;
    gap: 8px;
    min-height: 120px;
    padding: 16px;
    border-radius: 18px;
    background: rgba(243, 246, 239, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.06);
}

.doctor-consult-grid strong {
    color: var(--dark);
}

.doctor-consult-grid span {
    color: var(--muted);
    line-height: 1.6;
}

.auth-card h2 {
    margin: 0;
    font-size: clamp(1.9rem, 3vw, 2.6rem);
    letter-spacing: -0.05em;
}

.auth-card .subtext {
    margin: 12px 0 0;
    color: var(--muted);
    line-height: 1.7;
}

.form {
    display: grid;
    gap: 16px;
    margin-top: 26px;
}

.field {
    display: grid;
    gap: 8px;
}

.field label {
    color: var(--mid);
    font-size: 0.95rem;
    font-weight: 600;
}

.field input,
.field select {
    width: 100%;
    min-height: 52px;
    border-radius: 16px;
    border: 1px solid rgba(15, 42, 29, 0.12);
    background: rgba(255, 255, 255, 0.88);
    color: var(--ink);
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.field textarea {
    width: 100%;
    min-height: 150px;
    resize: vertical;
    border-radius: 16px;
    border: 1px solid rgba(15, 42, 29, 0.12);
    background: rgba(255, 255, 255, 0.88);
    color: var(--ink);
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    font: inherit;
}

.field input::placeholder {
    color: #7a877f;
}

.field textarea::placeholder {
    color: #7a877f;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
    border-color: rgba(55, 85, 52, 0.55);
    box-shadow: 0 0 0 4px rgba(174, 195, 176, 0.3);
}

.field-invalid {
    border-color: #a23d3d !important;
    box-shadow: 0 0 0 4px rgba(162, 61, 61, 0.12) !important;
}

.field-error {
    min-height: 1.1em;
    color: #a23d3d;
    font-size: 0.88rem;
    line-height: 1.35;
}

.form-status {
    margin: 0;
    min-height: 1.25em;
    font-size: 0.95rem;
    line-height: 1.4;
}

.form-status.form-error {
    color: #a23d3d;
}

.form-status.form-success {
    color: #1d6a42;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

.form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    color: var(--muted);
    font-size: 0.95rem;
}

.checkbox {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.checkbox input {
    width: 18px;
    height: 18px;
    accent-color: var(--mid);
}

.auth-card a,
.auth-panel a {
    color: var(--mid);
    text-decoration: none;
}

.auth-card a:hover,
.auth-panel a:hover {
    text-decoration: underline;
}

.helper {
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid rgba(15, 42, 29, 0.08);
    color: var(--muted);
    line-height: 1.65;
}

.helper .ghost-link {
    display: inline-flex;
    margin-top: 6px;
    font-weight: 600;
}

.form .button {
    width: 100%;
}

.page-footer {
    width: min(1120px, 100%);
    margin: 0 auto;
    padding: 14px 0 8px;
    color: rgba(15, 42, 29, 0.56);
    font-size: 0.92rem;
}

.site-footer {
    width: min(1120px, 100%);
    margin: 42px auto 0;
    padding: 26px 28px;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(15, 42, 29, 0.97), rgba(36, 75, 53, 0.96));
    box-shadow: var(--shadow);
    color: rgba(247, 249, 242, 0.92);
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(0, 0.7fr));
    gap: 24px;
}

.site-footer h3,
.site-footer p {
    margin: 0;
}

.site-footer h3 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(227, 238, 212, 0.9);
    margin-bottom: 10px;
}

.site-footer p {
    color: rgba(247, 249, 242, 0.82);
    line-height: 1.7;
}

.site-footer a {
    color: rgba(227, 238, 212, 0.95);
    text-decoration: none;
}

.site-footer a:hover {
    text-decoration: underline;
}

.footer-brand {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    margin-bottom: 12px;
}

.site-footer-auth {
    margin-top: 10px;
}

.content-section {
    width: min(1120px, 100%);
    margin: 0 auto;
    padding: 24px 0 0;
    scroll-margin-top: 120px;
}

.about-section {
    min-height: auto;
    display: grid;
    align-items: center;
    padding: 40px 0 52px;
    margin-bottom: 0;
}

.about-layout {
    display: grid;
    grid-template-columns: minmax(300px,520px) minmax(320px, 1fr);
    gap: 48px;
    align-items: center;
    justify-content: center;
    width: min(1040px, 100%);
    margin: 0 auto;
}

.about-media {
    display: flex;
    align-items: center;
    justify-content: center;
}

.about-image {
    width: 800%;
    max-width: 920px;
    transform: translate(10%, -5%);
}
.about-content {
    padding-left: 8px;
    max-width: 640px;
}

.services-section {
    min-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 48px;
    padding-bottom: 56px;
    margin-top: 0;
}

.section-heading {
    max-width: 760px;
    margin-bottom: 24px;
}

.section-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border-radius: 999px;
    background: rgba(174, 195, 176, 0.24);
    color: var(--mid);
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.section-heading h2 {
    margin: 0;
    font-size: clamp(2rem, 3.5vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.05em;
}

.section-heading p {
    margin: 14px 0 0;
    max-width: 62ch;
    color: var(--muted);
    line-height: 1.75;
}

.faq-section {
    padding-bottom: 12px;
}

.faq-heading {
    max-width: 820px;
    margin-bottom: 22px;
}

.faq-accordion {
    display: grid;
    gap: 16px;
}

.faq-accordion .accordion-item {
    border: 1px solid rgba(15, 42, 29, 0.08);
    border-radius: 24px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.82);
    box-shadow: 0 12px 30px rgba(15, 42, 29, 0.06);
}

.faq-accordion .accordion-item + .accordion-item {
    margin-top: 0;
}

.faq-accordion .accordion-header {
    margin: 0;
}

.faq-accordion .accordion-button {
    padding: 20px 24px;
    font-size: 1.03rem;
    font-weight: 700;
    line-height: 1.45;
    color: var(--dark);
    background: transparent;
    box-shadow: none;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.faq-accordion .accordion-button:not(.collapsed) {
    color: var(--dark);
    background: linear-gradient(135deg, rgba(227, 238, 212, 0.92), rgba(174, 195, 176, 0.26));
    box-shadow: inset 0 -1px 0 rgba(15, 42, 29, 0.06);
}

.faq-accordion .accordion-button:focus {
    border-color: transparent;
    box-shadow: 0 0 0 4px rgba(174, 195, 176, 0.34);
}

.faq-accordion .accordion-button::after {
    width: 1rem;
    height: 1rem;
    background-size: 1rem;
    filter: saturate(0%) brightness(0.35) sepia(1) hue-rotate(90deg) saturate(3.2);
}

.faq-accordion .accordion-body {
    padding: 0 24px 22px;
    color: var(--muted);
    line-height: 1.8;
}

.faq-accordion .accordion-body strong {
    color: var(--dark);
    font-weight: 700;
}

.faq-accordion .accordion-collapse {
    background: rgba(255, 255, 255, 0.55);
}

.faq-accordion .accordion-button:not(.collapsed)::after {
    filter: saturate(0%) brightness(0.35) sepia(1) hue-rotate(90deg) saturate(3.2);
}

.about-grid,
.services-grid {
    display: grid;
    gap: 18px;
}

.about-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.services-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 48px;
}

.info-card,
.service-card {
    padding: 24px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.78);
    border: 1px solid rgba(15, 42, 29, 0.08);
    box-shadow: 0 12px 30px rgba(15, 42, 29, 0.06);
    min-height: 180px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card {
    min-height: 220px;
}

.info-card:hover,
.service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(15, 42, 29, 0.12);
}

.info-card h3,
.service-card h3 {
    margin: 0;
    font-size: 1.2rem;
    letter-spacing: -0.03em;
}

.info-card p,
.service-card p {
    margin: 10px 0 0;
    color: var(--muted);
    line-height: 1.7;
    flex-grow: 1;
}

.service-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 14px;
    margin-bottom: 14px;
    background: linear-gradient(135deg, #e3eed4, #aec3b0);
    color: var(--dark);
    font-weight: 800;
    font-size: 1.1rem;
}

.content-list {
    display: grid;
    gap: 22px;
    margin-top: 28px;
}

.content-list-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 34px;
}

.content-point {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 16px;
    align-items: start;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(15, 42, 29, 0.1);
}

.content-point h3 {
    grid-column: 2;
    margin: 0;
    color: var(--dark);
    font-size: 1.2rem;
    letter-spacing: -0.02em;
}

.content-point p {
    grid-column: 2;
    margin: 8px 0 0;
    color: var(--muted);
    line-height: 1.7;
}

.content-point .service-icon {
    grid-row: 1 / span 2;
    margin: 0;
}

@media (max-width: 1024px) {

    /* Tablet styles (<=1024px) */
    .topbar,
    .hero-layout,
    .auth-layout {
        width: 100%;
    }

    .topbar {
        border-radius: 28px;
        flex-direction: column;
        align-items: stretch;
        padding: 14px;
    }

    .nav {
        justify-content: center;
        gap: 8px;
    }

    /* Stack hero for tablet: copy above, image below */
    .hero-layout,
    .auth-layout {
        grid-template-columns: 1fr;
        gap: 28px;
    }

    .hero-copy {
        order: 1;
        padding: 0 20px;
        text-align: center;
    }

    .hero-art {
        order: 2;
        min-height: 380px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px 12px;
    }

    .hero-image {
        max-width: 420px;
        width: 85%;
    }

    .about-grid,
    .services-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .site-footer {
        grid-template-columns: 1fr;
    }

    .about-section {
        min-height: auto;
        padding-top: 32px;
        padding-bottom: 48px;
        margin-bottom: 32px;
    }

    .about-layout {
        grid-template-columns: 1fr;
        gap: 20px;
        width: 92%;
        margin: 0 auto;
    }

    .services-section {
        min-height: auto;
        padding-top: 36px;
        padding-bottom: 48px;
        margin-top: 0;
    }

    .faq-heading {
        margin-bottom: 18px;
    }

    .admin-shell {
        grid-template-columns: 1fr;
    }

    .admin-sidebar {
        position: static;
    }

    .admin-menu {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .admin-hero {
        align-items: flex-start;
        flex-direction: column;
    }

    .admin-hero-actions {
        justify-content: flex-start;
    }

    .admin-metrics {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .admin-grid {
        grid-template-columns: 1fr;
    }

    .department-row {
        grid-template-columns: minmax(150px, 1fr) minmax(120px, 1fr) auto;
    }

    .admin-feature-hero {
        flex-direction: column;
    }

    .admin-feature-stats,
    .admin-feature-grid {
        grid-template-columns: 1fr;
    }

    .admin-module-layout {
        grid-template-columns: 1fr;
    }

    .doctor-overview-grid {
        grid-template-columns: 1fr;
    }

    .admin-module-wide {
        grid-row: auto;
    }

    .dashboard-navbar {
        grid-template-columns: 1fr;
        justify-items: stretch;
    }

    .dashboard-navbar-brand,
    .dashboard-navbar-links,
    .dashboard-navbar-actions {
        justify-content: center;
    }
}

@media (max-width: 640px) {
    /* Mobile styles */
    .page {
        padding: 12px 10px 20px;
    }

    .topbar {
        padding: 10px;
        margin-bottom: 18px;
    }

    .brand-name {
        font-size: 1.4rem;
    }

    .nav a {
        min-height: 36px;
        padding: 0 10px;
        font-size: 0.9rem;
    }

    .nav .nav-icon {
        width: 36px;
    }

    .floating-call {
        right: 14px;
        bottom: 14px;
        width: 52px;
        height: 52px;
        font-size: 1.05rem;
    }

    .hero-copy h1,
    .auth-panel h1 {
        max-width: none;
        font-size: clamp(1.8rem, 7.5vw, 2.2rem);
        text-align: center;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .auth-card {
        padding: 18px;
        border-radius: 20px;
    }

    .info-card,
    .service-card {
        min-height: 0;
    }

    .about-grid,
    .services-grid {
        grid-template-columns: 1fr;
    }

    .content-list-columns {
        grid-template-columns: 1fr;
    }

    .site-footer {
        padding: 16px;
        border-radius: 18px;
    }

    .about-section {
        min-height: auto;
        margin-bottom: 36px;
        padding-bottom: 40px;
    }

    .about-layout {
        grid-template-columns: 1fr;
        gap: 18px;
        width: 100%;
        padding: 0 8px;
    }

    .about-image {
        max-width: 320px;
        width: 88%;
        margin: 0 auto;
    }

    .services-section {
        min-height: auto;
        padding-top: 28px;
        padding-bottom: 42px;
        margin-top: 0;
    }

    .services-grid {
        grid-template-columns: 1fr;
        gap: 18px;
        width: 100%;
    }

    .faq-accordion .accordion-button {
        padding: 16px 18px;
        font-size: 0.98rem;
    }

    .faq-accordion .accordion-body {
        padding: 0 18px 18px;
    }

    .admin-shell {
        gap: 14px;
    }

    .admin-sidebar,
    .admin-hero,
    .admin-card {
        border-radius: 20px;
        padding: 18px;
    }

    .admin-menu {
        grid-template-columns: 1fr 1fr;
    }

    .admin-menu a {
        min-height: 38px;
        padding: 0 10px;
        font-size: 0.9rem;
    }

    .admin-metrics,
    .resource-grid {
        grid-template-columns: 1fr;
    }

    .admin-metric {
        border-radius: 18px;
    }

    .department-row {
        grid-template-columns: 1fr;
    }

    .department-row em {
        justify-self: start;
    }

    .admin-card-heading {
        display: grid;
    }

    .admin-card-heading span {
        text-align: left;
    }

    .admin-table-head,
    .admin-table-row {
        min-width: 620px;
    }

    .admin-feature-hero {
        border-radius: 20px;
        padding: 22px;
    }

    .admin-mini-grid {
        grid-template-columns: 1fr;
    }

    .doctor-consult-grid {
        grid-template-columns: 1fr;
    }

    .department-directory-head,
    .admin-lane-list div {
        display: grid;
    }

    .admin-lane-list span {
        text-align: left;
    }

    .dashboard-navbar {
        margin-bottom: 18px;
        padding: 10px;
        border-radius: 18px;
        gap: 10px;
    }

    .dashboard-navbar-links,
    .dashboard-navbar-actions {
        gap: 6px;
    }

    .dashboard-navbar-links a,
    .dashboard-navbar-home,
    .dashboard-navbar .button-ghost {
        min-height: 36px;
        padding: 0 10px;
        font-size: 0.88rem;
    }
}

/* Statistics Section */
.stats-section-container {
    padding: 60px 0;
}

.stats-section {
    width: min(1120px, 100%);
    margin: 0 auto;
    padding: 0;
    border-top: none;
    text-align: center;
}

.stats-section .section-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border-radius: 999px;
    background: rgba(174, 195, 176, 0.24);
    color: var(--mid);
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0 auto 16px;
}

.stats-section h2 {
    margin: 0 0 12px;
    font-size: 2.2rem;
    letter-spacing: -0.03em;
    color: var(--dark);
}

.stats-section > p {
    margin: 0 0 28px;
    color: var(--muted);
    line-height: 1.7;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    margin: 0 auto;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(15, 42, 29, 0.08);
    border-radius: 18px;
    text-align: center;
    min-height: 200px;
}

.stat-icon {
    font-size: 2.4rem;
    margin-bottom: 14px;
    display: block;
}

.stat-number {
    font-size: 2.8rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--dark);
    line-height: 1;
    margin-bottom: 12px;
}

.stat-label {
    font-size: 0.95rem;
    color: var(--muted);
    line-height: 1.5;
}

/* Mission & Vision Section */
.mission-vision-container {
    padding: 60px 0;
    background: rgba(255, 255, 255, 0.3);
}

.mission-vision {
    width: min(1120px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
    position: relative;
}

.mission-vision::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, rgba(29, 155, 102, 0.3), rgba(0, 102, 204, 0.3));
}

.mission,
.vision {
    padding: 32px;
    border-radius: 22px;
    border: 1px solid rgba(15, 42, 29, 0.08);
    position: relative;
    background: rgba(255, 255, 255, 0.6);
}

.mission-kicker,
.vision-kicker {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 12px;
}

.mission-kicker {
    color: #1d9b66;
}

.vision-kicker {
    color: #0066cc;
}

.mission h3,
.vision h3 {
    margin: 0 0 16px;
    font-size: 1.8rem;
    letter-spacing: -0.03em;
    color: var(--dark);
}

.mission p,
.vision p {
    margin: 0;
    color: var(--muted);
    line-height: 1.8;
    font-size: 0.95rem;
}

.mission .underline,
.vision .underline {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #1d9b66, #1d9b66);
    margin-top: 18px;
}

.vision .underline {
    background: linear-gradient(90deg, #0066cc, #0066cc);
}

/* Why Choose Us Section */
.why-choose-container {
    padding: 60px 0;
}

.why-choose-us {
    width: min(1120px, 100%);
    margin: 0 auto;
    padding: 0;
    border-top: none;
}

.why-choose-header {
    text-align: center;
    margin-bottom: 48px;
}

.why-choose-header .section-kicker {
    justify-content: center;
    margin: 0 auto 16px;
}

.excellence-kicker {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
    color: #10b981;
}

.why-choose-header h2 {
    margin: 0 0 12px;
    font-size: 2.4rem;
    letter-spacing: -0.03em;
    color: var(--dark);
}

.header-divider {
    font-size: 1.4rem;
    margin: 12px 0 20px;
    display: block;
}

.why-choose-header p {
    margin: 0;
    max-width: 72ch;
    color: var(--muted);
    line-height: 1.75;
    margin: 0 auto;
}

.why-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.why-grid li {
    padding: 32px 24px;
    border-radius: 18px;
    border: 1px solid rgba(15, 42, 29, 0.08);
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 280px;
}

.why-icon {
    width: 58px;
    height: 58px;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    background: linear-gradient(135deg, rgba(227, 238, 212, 0.96), rgba(174, 195, 176, 0.78));
    color: var(--dark);
    font-size: 1.95rem;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.why-grid li h4 {
    margin: 0 0 12px;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: var(--dark);
}

.why-grid li p {
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
    font-size: 0.9rem;
}

/* Responsive adjustments for stats and mission-vision */
@media (max-width: 1024px) {
    .stats-section-container,
    .mission-vision-container,
    .why-choose-container {
        padding: 48px 0;
    }

    .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mission-vision {
        grid-template-columns: 1fr;
        gap: 24px;
    }

    .mission-vision::before {
        display: none;
    }

    .why-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .stats-section-container,
    .mission-vision-container,
    .why-choose-container {
        padding: 36px 0;
    }

    .stats-grid {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    .stat {
        min-height: 140px;
        padding: 24px 16px;
    }

    .stat-number {
        font-size: 2rem;
    }

    .stats-section h2 {
        font-size: 1.6rem;
    }

    .mission,
    .vision {
        padding: 24px;
    }

    .mission h3,
    .vision h3 {
        font-size: 1.3rem;
    }

    .mission p,
    .vision p {
        font-size: 0.9rem;
    }

    .why-choose-header h2 {
        font-size: 1.6rem;
    }

    .why-grid {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    .why-grid li {
        min-height: auto;
        padding: 24px 16px;
    }

    .why-grid li h4 {
        font-size: 1rem;
    }

    .why-grid li p {
        font-size: 0.85rem;
    }
}

/* Doctors Section */
.doctors-section {
    min-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 48px;
    padding-bottom: 64px;
    margin-top: 0;
}

.doctors-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    margin-top: 48px;
}

.doctor-card {
    position: relative;
    padding: 28px 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(15, 42, 29, 0.08);
    box-shadow: 0 12px 30px rgba(15, 42, 29, 0.06);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.doctor-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(15, 42, 29, 0.12);
}

.doctor-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(251, 191, 36, 0.2);
    color: #ca8a04;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.doctor-badge.ceo-badge {
    background: rgba(139, 92, 246, 0.2);
    color: #7c3aed;
}

.doctor-image {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-bottom: 20px;
    border: 5px solid var(--soft);
    background:
        radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.88), transparent 24%),
        linear-gradient(135deg, #e3eed4, #aec3b0);
    flex-shrink: 0;
    overflow: hidden;
    display: grid;
    place-items: center;
    position: relative;
}

.doctor-image::before {
    content: "DR";
    color: var(--dark);
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 0.02em;
}

.doctor-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
}

.doctor-status {
    margin: 12px 0 0;
    color: var(--muted);
    line-height: 1.7;
}

.doctor-card:nth-child(1) .doctor-image {
    border-color: #b8e6d5;
}

.doctor-card:nth-child(2) .doctor-image {
    border-color: #a0dfd5;
}

.doctor-card:nth-child(3) .doctor-image {
    border-color: #b8dcc9;
}

.doctor-card:nth-child(4) .doctor-image {
    border-color: #a8d4c8;
}

.doctor-card:nth-child(5) .doctor-image {
    border-color: #b8e6d5;
}

.doctor-card:nth-child(6) .doctor-image {
    border-color: #a0dfd5;
}

.doctor-card:nth-child(7) .doctor-image {
    border-color: #b8dcc9;
}

.doctor-card:nth-child(8) .doctor-image {
    border-color: #a8d4c8;
}

.doctor-card h3 {
    margin: 0 0 8px;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    color: var(--dark);
}

.doctor-specialty {
    margin: 0 0 8px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--sage);
}

.doctor-role {
    margin: 0 0 12px;
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.5;
    min-height: 2.5em;
}

.doctor-cred {
    margin: 0;
    font-size: 0.8rem;
    color: #7a877f;
    font-weight: 500;
}

@media (max-width: 1024px) {
    .doctors-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
    }

    .doctors-section {
        padding-top: 36px;
        padding-bottom: 52px;
    }
}

@media (max-width: 640px) {
    .doctors-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .doctor-card {
        padding: 20px 16px;
    }

    .doctor-image {
        width: 120px;
        height: 120px;
        margin-bottom: 16px;
        border-width: 4px;
    }

    .doctor-card h3 {
        font-size: 1rem;
    }

    .doctor-specialty {
        font-size: 0.9rem;
    }

    .doctor-role {
        font-size: 0.8rem;
    }

    .doctor-cred {
        font-size: 0.75rem;
    }

    .doctors-section {
        padding-top: 28px;
        padding-bottom: 42px;
    }
}

/* Services Section - Why Choose Style */
.services-section-container {
    padding: 60px 0;
}

.services-section {
    width: min(1120px, 100%);
    margin: 0 auto;
}

.services-header {
    text-align: center;
    margin-bottom: 48px;
}

.services-header .section-kicker {
    justify-content: center;
    margin: 0 auto 16px;
}

.services-header h2 {
    margin: 0 0 12px;
    font-size: 2.4rem;
    letter-spacing: -0.03em;
    color: var(--dark);
}

.services-header .header-divider {
    font-size: 1.4rem;
    margin: 12px 0 20px;
    display: block;
}

.services-header p {
    margin: 0;
    max-width: 72ch;
    color: var(--muted);
    line-height: 1.75;
    margin: 0 auto;
}

.services-grid-new {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.services-grid-new li {
    padding: 32px 24px;
    border-radius: 18px;
    border: 1px solid rgba(15, 42, 29, 0.08);
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 280px;
}

.service-icon-new {
    font-size: 2.6rem;
    margin-bottom: 14px;
    display: block;
}

.services-grid-new li h4 {
    margin: 0 0 12px;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: var(--dark);
}

.services-grid-new li p {
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
    font-size: 0.9rem;
}

@media (max-width: 1024px) {
    .services-grid-new {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .services-section-container {
        padding: 36px 0;
    }

    .services-header h2 {
        font-size: 1.6rem;
    }

    .services-grid-new {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    .services-grid-new li {
        min-height: auto;
        padding: 24px 16px;
    }

    .services-grid-new li h4 {
        font-size: 1rem;
    }

    .services-grid-new li p {
        font-size: 0.85rem;
    }
}
