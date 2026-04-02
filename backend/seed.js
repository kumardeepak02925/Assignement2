const mongoose = require("mongoose");
const Student = require("./models/student");
require("dotenv").config();

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const students = [
      { name: "John Doe", age: 20, course: "BCA" },
      { name: "Jane Smith", age: 22, course: "MCA" }
    ];

    await Student.insertMany(students);
    console.log("Students seeded successfully");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedStudents();