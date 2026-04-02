const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Student = require("./models/student");

dotenv.config();

const app = express();

// ✅ Simple & clean CORS (NO manual headers)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // allow both
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ✅ Health route (for testing)
app.get("/health", (req, res) => res.json({ ok: true }));

// ✅ Logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ MongoDB connection & seeding
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Seed initial students if none exist
    const count = await Student.countDocuments();
    if (count === 0) {
      await Student.insertMany([
        { name: "John Doe", age: 20, course: "BCA" },
        { name: "Jane Smith", age: 22, course: "MCA" }
      ]);
      console.log("Initial students seeded");
    }
  })
  .catch((err) => console.log(err));

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));

// ✅ Port fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});