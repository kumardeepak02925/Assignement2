import React from "react";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-5 fixed">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <ul className="space-y-4">
        <li className="hover:text-gray-300 cursor-pointer">Students</li>
        <li className="hover:text-gray-300 cursor-pointer">Profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;