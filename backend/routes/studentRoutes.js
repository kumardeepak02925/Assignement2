const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const { getStudents, updateStudent, createStudent } = require("../controllers/studentcontroller");

// 🔓 Protected Route (User + Admin)
router.get("/", verifyToken, getStudents);

// 🔐 Admin Only
router.post("/", verifyToken, isAdmin, createStudent);
router.put("/:id", verifyToken, isAdmin, updateStudent);

module.exports = router;