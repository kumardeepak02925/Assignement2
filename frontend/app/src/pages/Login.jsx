import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      // Save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-xl w-80 border border-white/30">

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 mb-4 rounded bg-white/80 outline-none"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full p-2 rounded bg-white/80 outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-purple-600 font-semibold p-2 rounded hover:bg-gray-200 transition"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm mt-4 text-center text-white">
          Don’t have an account?{" "}
          <span
            className="text-yellow-300 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;