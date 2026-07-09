const Appointment = require("../Models/AppointmentModel");
const fileStore = require("../Utils/fileStore");

function isMongoReady() {
    return Appointment.db.readyState === 1;
}

async function createAppointment(req, res) {
    try {
        if (!isMongoReady()) {
            const appointment = fileStore.create("appointments", { status: "Requested", ...req.body });
            return res.status(201).json({ message: "Appointment created successfully.", data: appointment });
        }

        const appointment = await Appointment.create(req.body);
        return res.status(201).json({ message: "Appointment created successfully.", data: appointment });
    } catch (error) {
        return res.status(400).json({ message: "Error creating appointment.", error: error.message });
    }
}

async function getAppointments(req, res) {
    try {
        if (!isMongoReady()) {
            return res.status(200).json({ data: fileStore.list("appointments") });
        }

        const appointments = await Appointment.find().sort({ createdAt: -1 });
        return res.status(200).json({ data: appointments });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching appointments.", error: error.message });
    }
}

async function getAppointmentById(req, res) {
    try {
        if (!isMongoReady()) {
            const appointment = fileStore.findById("appointments", req.params.id);
            if (!appointment) return res.status(404).json({ message: "Appointment not found." });
            return res.status(200).json({ data: appointment });
        }

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found." });
        return res.status(200).json({ data: appointment });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching appointment.", error: error.message });
    }
}

async function updateAppointment(req, res) {
    try {
        if (!isMongoReady()) {
            const appointment = fileStore.update("appointments", req.params.id, req.body);
            if (!appointment) return res.status(404).json({ message: "Appointment not found." });
            return res.status(200).json({ message: "Appointment updated successfully.", data: appointment });
        }

        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appointment) return res.status(404).json({ message: "Appointment not found." });
        return res.status(200).json({ message: "Appointment updated successfully.", data: appointment });
    } catch (error) {
        return res.status(400).json({ message: "Error updating appointment.", error: error.message });
    }
}

async function deleteAppointment(req, res) {
    try {
        if (!isMongoReady()) {
            const appointment = fileStore.remove("appointments", req.params.id);
            if (!appointment) return res.status(404).json({ message: "Appointment not found." });
            return res.status(200).json({ message: "Appointment deleted successfully." });
        }

        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found." });
        return res.status(200).json({ message: "Appointment deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting appointment.", error: error.message });
    }
}

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
