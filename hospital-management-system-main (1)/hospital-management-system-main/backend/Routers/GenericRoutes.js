const express = require("express");
const fileStore = require("../Utils/fileStore");

function createGenericRoutes(collection) {
    const router = express.Router();

    router.post("/", (req, res) => {
        const record = fileStore.create(collection, req.body);
        res.status(201).json({ message: "Record created successfully.", data: record });
    });

    router.get("/", (req, res) => {
        res.status(200).json({ data: fileStore.list(collection) });
    });

    router.get("/:id", (req, res) => {
        const record = fileStore.findById(collection, req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found." });
        res.status(200).json({ data: record });
    });

    router.put("/:id", (req, res) => {
        const record = fileStore.update(collection, req.params.id, req.body);
        if (!record) return res.status(404).json({ message: "Record not found." });
        res.status(200).json({ message: "Record updated successfully.", data: record });
    });

    router.delete("/:id", (req, res) => {
        const record = fileStore.remove(collection, req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found." });
        res.status(200).json({ message: "Record deleted successfully." });
    });

    return router;
}

module.exports = createGenericRoutes;
