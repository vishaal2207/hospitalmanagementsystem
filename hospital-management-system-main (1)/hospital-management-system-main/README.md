# Hospital Management System

A full-stack Hospital Management System built with React, Express, MongoDB, and a file-store fallback. The project includes role-based dashboards for hospital admins, doctors, and patients, with live CRUD flows for users, appointments, doctors, medical records, billing, and support requests.

## Live Project

- Frontend: https://hms-medicare.vercel.app
- Backend API: https://hospital-management-system-y3xo.onrender.com
- API health check: https://hospital-management-system-y3xo.onrender.com/api/health

## Features

- Role-based authentication for Hospital Admin, Doctor, and Patient users.
- Admin dashboard for staff accounts, appointment approval, departments, resources, reports, and support messages.
- Doctor dashboard for appointment scheduling, patient lists, consultations, records, and reports.
- Patient dashboard for appointment requests, doctor records, medical records, billing, and support.
- CRUD operations through the backend API for:
  - Users
  - Appointments
  - Contacts and support messages
  - Doctors
  - Medical records
  - Bills
- Appointment scheduling with date, time, doctor, room, and status updates.
- MongoDB support with local JSON file-store fallback for development.
- Deployed frontend on Vercel and backend on Render.

## Tech Stack

Frontend:
- React
- React Router
- CSS
- Fetch API

Backend:
- Node.js
- Express
- MongoDB with Mongoose
- CORS
- dotenv

Deployment:
- Vercel for frontend
- Render for backend

## Project Structure

```text
HMS/
  backend/
    Controllers/
    Models/
    Routers/
    Utils/
    data/
    server.js
    package.json

  hms/
    public/
    src/
      Components/
      Context/
      Utils/
    package.json
```

## Local Setup

### 1. Clone the project

```bash
git clone <repository-url>
cd HMS
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URL=<your-mongodb-connection-string>
PORT=5000
```

Start the backend:

```bash
npm start
```

Backend runs at:

```text
http://localhost:5000
```

### 3. Frontend setup

```bash
cd ../hms
npm install
```

For local backend usage, create `hms/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production backend usage:

```env
REACT_APP_API_URL=https://hospital-management-system-y3xo.onrender.com/api
```

Start the frontend:

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

## API Endpoints

Base URL:

```text
https://hospital-management-system-y3xo.onrender.com/api
```

Health:

```text
GET /health
```

Users:

```text
POST   /users/signup
POST   /users/managed
POST   /users/login
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```

Public signup creates Patient accounts by default. The protected admin email `devprasatha9@gmail.com` is always treated as a Hospital Admin. Doctor and additional admin accounts should be created from the Admin Dashboard staff management section, which uses `/users/managed`.

Appointments:

```text
POST   /appointments
GET    /appointments
GET    /appointments/:id
PUT    /appointments/:id
DELETE /appointments/:id
```

Contacts:

```text
POST   /contacts
GET    /contacts
PUT    /contacts/:id
DELETE /contacts/:id
```

Generic CRUD collections:

```text
GET    /doctors
POST   /doctors
PUT    /doctors/:id
DELETE /doctors/:id

GET    /records
POST   /records
PUT    /records/:id
DELETE /records/:id

GET    /bills
POST   /bills
PUT    /bills/:id
DELETE /bills/:id
```

## Deployment Notes

### Render Backend

Root directory:

```text
backend
```

Build command:

```bash
npm install
```

Start command:

```bash
node server.js
```

Environment variables:

```env
MONGO_URL=<your-mongodb-connection-string>
```

Important: the backend entry file is lowercase `server.js`. Linux deployment environments are case-sensitive.

### Vercel Frontend

Root directory:

```text
hms
```

Build command:

```bash
npm run build
```

Output directory:

```text
build
```

Environment variable:

```env
REACT_APP_API_URL=https://hospital-management-system-y3xo.onrender.com/api
```

## Scripts

Backend:

```bash
npm start
```

Frontend:

```bash
npm start
npm run build
```

## Notes

- The backend root route `/` returns JSON project/API information.
- If MongoDB is not connected, the backend can use the local JSON file store in `backend/data/store.json`.
- The frontend API fallback is currently set to the deployed Render API.
