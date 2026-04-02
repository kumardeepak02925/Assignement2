const Student = require("../models/student");

// VIEW STUDENTS (User + Admin)
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE STUDENT (Admin only)
exports.createStudent = async (req, res) => {
    try {
        const { name, age, course } = req.body;
        const newStudent = new Student({ name, age, course });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE STUDENT (Admin only)
exports.updateStudent = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};