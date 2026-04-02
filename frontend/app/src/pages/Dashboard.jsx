import React, { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../componets/Sidebar";
import Navbar from "../componets/Navbar";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/student", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStudents(res.data);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setForm({ name: student.name, age: student.age, course: student.course });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    await API.put(`/student/${selectedStudent._id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setShowModal(false);
    fetchStudents();
  };

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="ml-60 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Students</h2>

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Course</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="text-center border-t">
                <td className="p-3">{s.name}</td>
                <td>{s.age}</td>
                <td>{s.course}</td>

                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => openEditModal(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Edit Student</h3>

              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded mb-3"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="number"
                placeholder="Age"
                className="w-full p-2 border rounded mb-3"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />

              <input
                type="text"
                placeholder="Course"
                className="w-full p-2 border rounded mb-4"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;