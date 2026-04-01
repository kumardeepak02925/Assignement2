import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registration Successful ✅");
      navigate("/");
    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Role Selection */}
        <select
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">Normal User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>

    </div>
  );
};

export default Register;