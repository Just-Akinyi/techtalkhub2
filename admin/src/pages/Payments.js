import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // your firebase config
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState(""); // format: YYYY-MM

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentsRef = collection(db, "payments");
      const q = query(paymentsRef, orderBy("paid_at", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPayments(data);
      setLoading(false);
    };

    fetchPayments();
  }, []);

  // Filter by month
  const filteredPayments = monthFilter
    ? payments.filter((p) => {
        const date = p.paid_at?.toDate ? p.paid_at.toDate() : new Date(p.paid_at);
        const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
        return monthStr === monthFilter;
      })
    : payments;

  const successfulPayments = filteredPayments.filter((p) => p.status === "success");
  const failedPayments = filteredPayments.filter((p) => p.status !== "success");

  const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);

  // Prepare data for chart (monthly revenue)
  const monthlyRevenue = {};
  successfulPayments.forEach((p) => {
    const date = p.paid_at?.toDate ? p.paid_at.toDate() : new Date(p.paid_at);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    monthlyRevenue[monthStr] = (monthlyRevenue[monthStr] || 0) + p.amount;
  });

  const chartData = Object.keys(monthlyRevenue)
    .sort()
    .map((month) => ({ month, revenue: monthlyRevenue[month] }));

  if (loading) return <p className="text-primary p-4">Loading payments...</p>;

  return (
    <div className="p-6 overflow-x-auto text-primary">
      <h1 className="text-2xl font-bold mb-4">Payments Dashboard</h1>

      {/* Total Revenue Card */}
      <div className="mb-6">
        <div className="bg-accent p-6 rounded-xl shadow-card w-64">
          <h2 className="text-xl text-background font-bold">Total Revenue</h2>
          <p className="text-3xl text-background mt-2">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Month Filter */}
      <div className="mb-6">
        <label className="mr-2 font-bold">Filter by month:</label>
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="p-2 rounded text-black"
        />
      </div>

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <div className="bg-white text-black p-4 rounded-xl shadow-card mb-6">
          <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FF4081" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Successful Payments Table */}
      <h2 className="text-xl font-bold mb-2 mt-4">Successful Payments</h2>
      <table className="min-w-full bg-white text-black rounded-xl overflow-hidden shadow-card mb-6">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4 text-left">Reference</th>
            <th className="py-2 px-4 text-left">Student</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Currency</th>
            <th className="py-2 px-4 text-left">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {successfulPayments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{payment.reference}</td>
              <td className="py-2 px-4">{payment.student_name}</td>
              <td className="py-2 px-4">{payment.email}</td>
              <td className="py-2 px-4">{payment.amount}</td>
              <td className="py-2 px-4">{payment.currency}</td>
              <td className="py-2 px-4">
                {payment.paid_at?.toDate
                  ? payment.paid_at.toDate().toLocaleString()
                  : new Date(payment.paid_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Failed Payments Table */}
      <h2 className="text-xl font-bold mb-2 mt-4">Failed Payments</h2>
      <table className="min-w-full bg-white text-black rounded-xl overflow-hidden shadow-card mb-6">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4 text-left">Reference</th>
            <th className="py-2 px-4 text-left">Student</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Currency</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {failedPayments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{payment.reference}</td>
              <td className="py-2 px-4">{payment.student_name}</td>
              <td className="py-2 px-4">{payment.email}</td>
              <td className="py-2 px-4">{payment.amount}</td>
              <td className="py-2 px-4">{payment.currency}</td>
              <td className="py-2 px-4 capitalize">{payment.status}</td>
              <td className="py-2 px-4">
                {payment.paid_at?.toDate
                  ? payment.paid_at.toDate().toLocaleString()
                  : new Date(payment.paid_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
