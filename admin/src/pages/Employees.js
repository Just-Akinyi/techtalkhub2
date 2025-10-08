import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { appDb } from "../firebaseApp";

export default function EmployeesPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const q = query(collection(appDb, "users"), where("role", "==", "teacher"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 font-poppins">
        Loading employees...
      </div>
    );

  if (!teachers.length)
    return (
      <div className="p-10 text-center text-gray-600 font-poppins">
        No employees found.
      </div>
    );

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-poppins">
      <h1 className="text-2xl font-bold text-primary mb-6">Our Employees</h1>

      <div className="overflow-x-auto bg-white shadow-card rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Country</th>
              <th className="py-3 px-4 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{t.name || "—"}</td>
                <td className="py-2 px-4">{t.email || "—"}</td>
                <td className="py-2 px-4">{t.phone || "—"}</td>
                <td className="py-2 px-4">{t.country || "—"}</td>
                <td className="py-2 px-4">
                  {t.createdAt
                    ? new Date(t.createdAt.seconds * 1000).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
