const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(express.json());

const allowedOrigins = [
    "https://hms-medicare.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
];

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

const UserRoutes = require("./Routers/UserRoutes");
const AppointmentRoutes = require("./Routers/AppointmentRoutes");
const ContactRoutes = require("./Routers/ContactRoutes");
const GenericRoutes = require("./Routers/GenericRoutes");

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hospital Management System API is running",
        status: "ok",
        endpoints: {
            health: "/api/health",
            users: "/api/users",
            appointments: "/api/appointments",
            contacts: "/api/contacts",
            doctors: "/api/doctors",
            records: "/api/records",
            bills: "/api/bills"
        }
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

app.use("/api/users", UserRoutes);
app.use("/api/appointments", AppointmentRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/doctors", GenericRoutes("doctors"));
app.use("/api/records", GenericRoutes("records"));
app.use("/api/bills", GenericRoutes("bills"));

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl,
        availableRoot: "/",
        availableApiHealth: "/api/health"
    });
});

mongoose
.connect(process.env.MONGO_URL)
.then(() => {console.log('Connected to MongoDB');})
.catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Port is running on ${PORT}`);
});
