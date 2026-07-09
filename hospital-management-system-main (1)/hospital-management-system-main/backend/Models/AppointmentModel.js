const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: "",
        trim: true
    },
    doctor: {
        type: String,
        default: "",
        trim: true
    },
    room: {
        type: String,
        default: "",
        trim: true
    },
    notes: {
        type: String,
        default: "",
        trim: true
    },
    status: {
        type: String,
        enum: ["Requested", "Confirmed", "Checked in", "Completed", "Cancelled"],
        default: "Requested"
    }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);
