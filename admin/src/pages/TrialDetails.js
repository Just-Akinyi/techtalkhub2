// src/pages/TrialDetailsPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function TrialDetailsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookings(data);
      } catch (err) {
        console.error("Error fetching trial bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 font-poppins">
        Loading trial details...
      </div>
    );

  if (!bookings.length)
    return (
      <div className="p-10 text-center text-gray-600 font-poppins">
        No trial bookings found.
      </div>
    );

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return { color: "bg-green-500", tooltip: "Paid client" };
      case "attended":
        return { color: "bg-blue-500", tooltip: "Attended (attended)" };
      case "no-show":
        return { color: "bg-red-500", tooltip: "No show (didn't attend)" };
      default:
        return { color: "bg-purple-400", tooltip: "New lead (booked)" };
    }
  };

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-poppins">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Trial Class Bookings
      </h1>

      <div className="overflow-x-auto bg-white shadow-card rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Student</th>
              <th className="py-3 px-4 text-left">Grade</th>
              <th className="py-3 px-4 text-left">Parent</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">WhatsApp</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time(in admin timezone)</th>
              <th className="py-3 px-4 text-left">Country</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const { color, tooltip } = getStatusStyle(b.status);
              return (
                <tr key={b.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{b.studentName}</td>
                  <td className="py-2 px-4">{b.studentGrade}</td>
                  <td className="py-2 px-4">{b.parentName}</td>
                  <td className="py-2 px-4">{b.email}</td>
                  <td className="py-2 px-4">
                    {b.country?.flag} {b.country?.dial} {b.whatsapp}
                  </td>
                  <td className="py-2 px-4">{b.date}</td>
                  <td className="py-2 px-4">{b.time}</td>
                  <td className="py-2 px-4">{b.country?.name}</td>
                  <td className="py-2 px-4">
                    <div
                      title={tooltip}
                      className={`w-4 h-4 rounded-full ${color} mx-auto cursor-pointer`}
                    ></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
