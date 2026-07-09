const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dataDir = path.join(__dirname, "..", "data");
const dataFile = path.join(dataDir, "store.json");

const initialData = {
    users: [],
    appointments: [],
    contacts: [],
    doctors: [],
    records: [],
    bills: []
};

function ensureStore() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
    }
}

function readStore() {
    ensureStore();
    try {
        return {
            ...initialData,
            ...JSON.parse(fs.readFileSync(dataFile, "utf8"))
        };
    } catch (error) {
        return { ...initialData };
    }
}

function writeStore(data) {
    ensureStore();
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function create(collection, record) {
    const data = readStore();
    const now = new Date().toISOString();
    const nextRecord = {
        _id: crypto.randomUUID(),
        ...record,
        createdAt: now,
        updatedAt: now
    };

    data[collection] = [nextRecord, ...(data[collection] || [])];
    writeStore(data);
    return nextRecord;
}

function list(collection) {
    const data = readStore();
    return data[collection] || [];
}

function findById(collection, id) {
    return list(collection).find((item) => item._id === id) || null;
}

function findOne(collection, predicate) {
    return list(collection).find(predicate) || null;
}

function update(collection, id, patch) {
    const data = readStore();
    const items = data[collection] || [];
    const index = items.findIndex((item) => item._id === id);

    if (index === -1) {
        return null;
    }

    items[index] = {
        ...items[index],
        ...patch,
        updatedAt: new Date().toISOString()
    };
    data[collection] = items;
    writeStore(data);
    return items[index];
}

function remove(collection, id) {
    const data = readStore();
    const items = data[collection] || [];
    const item = items.find((entry) => entry._id === id);

    if (!item) {
        return null;
    }

    data[collection] = items.filter((entry) => entry._id !== id);
    writeStore(data);
    return item;
}

module.exports = {
    create,
    list,
    findById,
    findOne,
    update,
    remove
};
