import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { appDb } from "../firebaseApp";

export default function SubscribersPage() {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const qStudents = query(collection(appDb, "users"), where("role", "==", "student"));
        const qParents = query(collection(appDb, "users"), where("role", "==", "parent"));

        const [studentsSnap, parentsSnap] = await Promise.all([
          getDocs(qStudents),
          getDocs(qParents),
        ]);

        setStudents(studentsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setParents(parentsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-600 font-poppins">Loading subscribers...</div>;

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-poppins">
      <h1 className="text-2xl font-bold text-primary mb-6">Subscribers</h1>

      {/* Students */}
      <div className="mb-8 bg-white shadow-card rounded-xl overflow-x-auto">
        <h2 className="text-xl font-semibold text-secondary p-4">Students</h2>
        <table className="min-w-full border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Parent</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{s.name}</td>
                <td className="py-2 px-4">{s.email}</td>
                <td className="py-2 px-4">{s.parentName || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Parents */}
      <div className="bg-white shadow-card rounded-xl overflow-x-auto">
        <h2 className="text-xl font-semibold text-secondary p-4">Parents</h2>
        <table className="min-w-full border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.email}</td>
                <td className="py-2 px-4">{p.phone || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
