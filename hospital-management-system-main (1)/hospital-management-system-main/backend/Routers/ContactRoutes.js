const express = require("express");
const {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} = require("../Controllers/ContactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
