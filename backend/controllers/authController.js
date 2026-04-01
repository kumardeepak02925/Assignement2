const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "name, email, password are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: role === "admin" ? "admin" : "user"
        });

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            msg: "Login successful",
            token,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};