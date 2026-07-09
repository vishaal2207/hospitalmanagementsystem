const User = require("../Models/UserModel");
const fileStore = require("../Utils/fileStore");

const publicUserFields = "-password";
const primaryAdminEmail = "devprasatha9@gmail.com";

function isMongoReady() {
    return User.db.readyState === 1;
}

function stripPassword(user) {
    if (!user) return user;
    const { password, ...safeUser } = user.toObject ? user.toObject() : user;
    return applyProtectedRole(safeUser);
}

function applyProtectedRole(user) {
    if (!user) return user;
    if ((user.email || "").toLowerCase().trim() === primaryAdminEmail) {
        return { ...user, role: "Hospital Admin" };
    }
    return user;
}

function publicSignupRole(email) {
    return (email || "").toLowerCase().trim() === primaryAdminEmail ? "Hospital Admin" : "Patient";
}

async function createUser(req, res) {
    try {
        const { firstName, lastName, email, mobileNumber = "", password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "firstName, lastName, email, and password are required." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const role = publicSignupRole(normalizedEmail);

        if (!isMongoReady()) {
            const existing = fileStore.findOne("users", (user) => user.email === normalizedEmail);
            if (existing) {
                return res.status(409).json({ message: "An account with this email already exists." });
            }
            const user = fileStore.create("users", { firstName, lastName, email: normalizedEmail, mobileNumber, role, password });
            return res.status(201).json({ message: "User registered successfully.", data: stripPassword(user) });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists." });
        }

        const user = await User.create({ firstName, lastName, email: normalizedEmail, mobileNumber, role, password });
        const savedUser = await User.findById(user._id).select(publicUserFields);
        return res.status(201).json({ message: "User registered successfully.", data: savedUser });
    } catch (error) {
        return res.status(500).json({ message: "Error registering user.", error: error.message });
    }
}

async function createManagedUser(req, res) {
    try {
        const { firstName, lastName, email, mobileNumber = "", role = "Patient", password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "firstName, lastName, email, and password are required." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const managedRole = normalizedEmail === primaryAdminEmail ? "Hospital Admin" : role;

        if (!["Hospital Admin", "Doctor", "Patient"].includes(managedRole)) {
            return res.status(400).json({ message: "Invalid user role." });
        }

        if (!isMongoReady()) {
            const existing = fileStore.findOne("users", (user) => user.email === normalizedEmail);
            if (existing) {
                return res.status(409).json({ message: "An account with this email already exists." });
            }
            const user = fileStore.create("users", { firstName, lastName, email: normalizedEmail, mobileNumber, role: managedRole, password });
            return res.status(201).json({ message: "User created successfully.", data: stripPassword(user) });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists." });
        }

        const user = await User.create({ firstName, lastName, email: normalizedEmail, mobileNumber, role: managedRole, password });
        const savedUser = await User.findById(user._id).select(publicUserFields);
        return res.status(201).json({ message: "User created successfully.", data: stripPassword(savedUser) });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user.", error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const normalizedEmail = email.toLowerCase().trim();

        if (!isMongoReady()) {
            const user = fileStore.findOne("users", (record) => record.email === normalizedEmail && record.password === password);
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password." });
            }
            return res.status(200).json({ message: "Login successful.", data: stripPassword(user) });
        }

        const user = await User.findOne({ email: normalizedEmail, password }).select(publicUserFields);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        return res.status(200).json({ message: "Login successful.", data: applyProtectedRole(user.toObject ? user.toObject() : user) });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in.", error: error.message });
    }
}

async function getUsers(req, res) {
    try {
        if (!isMongoReady()) {
            return res.status(200).json({ data: fileStore.list("users").map(stripPassword) });
        }

        const users = await User.find().select(publicUserFields).sort({ createdAt: -1 });
        return res.status(200).json({ data: users.map((user) => applyProtectedRole(user.toObject ? user.toObject() : user)) });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users.", error: error.message });
    }
}

async function getUserById(req, res) {
    try {
        if (!isMongoReady()) {
            const user = fileStore.findById("users", req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            return res.status(200).json({ data: stripPassword(user) });
        }

        const user = await User.findById(req.params.id).select(publicUserFields);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ data: applyProtectedRole(user.toObject ? user.toObject() : user) });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user.", error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const patch = { ...req.body };
        if ((patch.email || "").toLowerCase().trim() === primaryAdminEmail) {
            patch.role = "Hospital Admin";
        }

        if (!isMongoReady()) {
            const existing = fileStore.findById("users", req.params.id);
            if ((existing?.email || "").toLowerCase().trim() === primaryAdminEmail) {
                patch.role = "Hospital Admin";
            }
            const user = fileStore.update("users", req.params.id, patch);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            return res.status(200).json({ message: "User updated successfully.", data: stripPassword(user) });
        }

        const existingUser = await User.findById(req.params.id);
        if ((existingUser?.email || "").toLowerCase().trim() === primaryAdminEmail) {
            patch.role = "Hospital Admin";
        }

        const user = await User.findByIdAndUpdate(req.params.id, patch, {
            new: true,
            runValidators: true
        }).select(publicUserFields);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User updated successfully.", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Error updating user.", error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        if (!isMongoReady()) {
            const user = fileStore.remove("users", req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            return res.status(200).json({ message: "User deleted successfully." });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user.", error: error.message });
    }
}

module.exports = {
    createUser,
    createManagedUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
