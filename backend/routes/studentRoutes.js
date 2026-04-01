const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const { getStudents, updateStudent } = require("../controllers/studentController");

// 🔓 Protected Route (User + Admin)
router.get("/", verifyToken, getStudents);

// 🔐 Admin Only
router.put("/:id", verifyToken, isAdmin, updateStudent);

module.exports = router;