import React, { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../componets/Sidebar";
import Navbar from "../componets/Navbar";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
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

  const updateStudent = async (id) => {
    await API.put(`/student/${id}`, { course: "MCA" }, {
      headers: { Authorization: `Bearer ${token}` }
    });
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
                      onClick={() => updateStudent(s._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Dashboard;