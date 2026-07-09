const express = require("express");
const {
    createUser,
    createManagedUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../Controllers/UserController");

const router = express.Router();

router.post("/signup", createUser);
router.post("/managed", createManagedUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
