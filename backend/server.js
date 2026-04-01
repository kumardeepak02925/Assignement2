const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ ADD THIS

dotenv.config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
// Put a manual preflight responder first; Express 5 can auto-respond to OPTIONS
// without CORS headers if we don't handle it explicitly.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === "http://localhost:5174") {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
  }

  if (req.method === "OPTIONS") return res.sendStatus(204);
  return next();
});

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

// Health route
app.get("/health", (req, res) => res.json({ ok: true }));

// Logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));