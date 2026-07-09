const Contact = require("../Models/ContactModel");
const fileStore = require("../Utils/fileStore");

function isMongoReady() {
    return Contact.db.readyState === 1;
}

async function createContact(req, res) {
    try {
        if (!isMongoReady()) {
            const contact = fileStore.create("contacts", { status: "Open", ...req.body });
            return res.status(201).json({ message: "Message created successfully.", data: contact });
        }

        const contact = await Contact.create(req.body);
        return res.status(201).json({ message: "Message created successfully.", data: contact });
    } catch (error) {
        return res.status(400).json({ message: "Error creating message.", error: error.message });
    }
}

async function getContacts(req, res) {
    try {
        if (!isMongoReady()) {
            return res.status(200).json({ data: fileStore.list("contacts") });
        }

        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json({ data: contacts });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching messages.", error: error.message });
    }
}

async function getContactById(req, res) {
    try {
        if (!isMongoReady()) {
            const contact = fileStore.findById("contacts", req.params.id);
            if (!contact) return res.status(404).json({ message: "Message not found." });
            return res.status(200).json({ data: contact });
        }

        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Message not found." });
        return res.status(200).json({ data: contact });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching message.", error: error.message });
    }
}

async function updateContact(req, res) {
    try {
        if (!isMongoReady()) {
            const contact = fileStore.update("contacts", req.params.id, req.body);
            if (!contact) return res.status(404).json({ message: "Message not found." });
            return res.status(200).json({ message: "Message updated successfully.", data: contact });
        }

        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contact) return res.status(404).json({ message: "Message not found." });
        return res.status(200).json({ message: "Message updated successfully.", data: contact });
    } catch (error) {
        return res.status(400).json({ message: "Error updating message.", error: error.message });
    }
}

async function deleteContact(req, res) {
    try {
        if (!isMongoReady()) {
            const contact = fileStore.remove("contacts", req.params.id);
            if (!contact) return res.status(404).json({ message: "Message not found." });
            return res.status(200).json({ message: "Message deleted successfully." });
        }

        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "Message not found." });
        return res.status(200).json({ message: "Message deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting message.", error: error.message });
    }
}

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};
