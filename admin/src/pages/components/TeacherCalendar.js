import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTime } from "luxon";
import { collection, getDocs } from "firebase/firestore";
import { appDb } from "../firebaseApp";

export default function TeacherCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const snapshot = await getDocs(collection(appDb, "bookings"));
    const bookings = snapshot.docs.map((doc) => doc.data());

    const eventList = bookings.map((b) => {
      const color =
        b.type === "trial"
          ? "purple"
          : b.type === "course"
          ? "green"
          : b.type === "missed"
          ? "red"
          : "yellow"; // teacher free slot

      const start = DateTime.fromISO(b.start)
        .setZone(b.timezone || "Africa/Nairobi")
        .toISO();

      const end = DateTime.fromISO(b.end)
        .setZone(b.timezone || "Africa/Nairobi")
        .toISO();

      return {
        title: `${b.teacher || "Unknown"} - ${b.type}`,
        start,
        end,
        backgroundColor: color,
      };
    });

    setEvents(eventList);
  }

  const handleDateSelect = (info) => {
    const start = info.startStr;
    const end = info.endStr;

    const newEvent = {
      title: "Free Slot",
      start,
      end,
      backgroundColor: "yellow",
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Booking Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        events={events}
        select={handleDateSelect}
        height="80vh"
      />
    </div>
  );
}
