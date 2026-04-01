import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="ml-60 bg-white shadow p-4 flex justify-between">
      <h1 className="font-semibold">Student System</h1>
      <button onClick={logout} className="text-red-500">Logout</button>
    </div>
  );
};

export default Navbar;