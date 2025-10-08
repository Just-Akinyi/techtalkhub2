import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChalkboardTeacher,
  FaUserFriends,
  FaCalendarAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "#" },
    { name: "Users", icon: <FaUser />, link: "#" },

    { name: "Trial Bookingss", icon: <FaCog />, link: "/admin/trials" },
    { name: "Subscribers", icon: <FaUserFriends />, link: "/admin/subscribers" },
    { name: "Employees", icon: <FaChalkboardTeacher/>, link: "/admin/employees" },
    { name: "Calendar", icon: <FaCalendarAlt />, link: "/admin/calendar" },

    { name: "Analytics", icon: <FaChartBar />, link: "#" },
    { name: "Settings", icon: <FaCog />, link: "#" },
    { name: "Logout", icon: <FaSignOutAlt />, link: "#" },
  ];

  return (
    <div
      className={`relative h-screen bg-primary text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } shadow-lg flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-secondary text-white rounded-full p-1 shadow-md hover:bg-accent transition"
      >
        {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </button>

      {/* Logo */}
      {/* <div className="flex items-center justify-center mt-8 mb-6">
        {!collapsed ? (
          <h1 className="text-2xl font-bold font-poppins">Admin Panel</h1>
        ) : (
          <div className="text-2xl font-bold">A</div>
        )}
      </div> */}
      {/* --------------------- */}
      {/* <div className="flex items-center justify-center mt-8 mb-6">
  <img
    src="/your-photo.jpg"
    alt="Admin"
    className={`rounded-full object-cover transition-all duration-300 ${
      collapsed ? "w-10 h-10" : "w-24 h-24"
    }`}
  />
</div> */}
{/* --------------------- */}
<div className="flex items-center justify-center mt-8 mb-6">
  <div
    className={`bg-secondary rounded-full flex items-center justify-center text-white transition-all duration-300 ${
      collapsed ? "w-10 h-10 text-xl" : "w-24 h-24 text-4xl"
    }`}
  >
    <FaUser />
  </div>
</div>



      {/* Menu */}
      <nav className="flex flex-col gap-3 px-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="text-lg">{item.icon}</div>
            {!collapsed && <span className="font-poppins">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer or space filler */}
      <div className="mt-auto mb-6 text-center text-xs opacity-70">
        {!collapsed && "© 2025 Tech Talk"}
      </div>
    </div>
  );
}
