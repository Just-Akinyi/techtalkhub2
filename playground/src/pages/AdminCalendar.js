import React, { useEffect, useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // website DB for trials
import { appDb } from "../firebaseApp"; // app DB for teachers & course bookings
import moment from "moment-timezone";

// Setup localizer (required by react-big-calendar)
const localizer = momentLocalizer(moment);

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trialsSnap, teachersSnap, bookingsSnap] = await Promise.all([
          getDocs(collection(db, "bookings")), // trials
          getDocs(collection(appDb, "teacherSlots")), // teachers free slots
          getDocs(collection(appDb, "classes")), // course bookings
        ]);

        const trialEvents = trialsSnap.docs.map((d) => {
          const data = d.data();
          const date = data.date;
          const time = data.time;
          const dt = DateTime.fromFormat(`${date} ${time}`, "yyyy-MM-dd HH:mm", {
            zone: data.country?.tz || "UTC",
          }).setZone("Africa/Nairobi"); // admin timezone

          return {
            title: `Trial: ${data.studentName || "Student"}`,
            start: dt.toJSDate(),
            end: dt.plus({ hours: 1 }).toJSDate(),
            type: "trial",
          };
        });

        const slotEvents = teachersSnap.docs.map((d) => {
          const data = d.data();
          const dt = DateTime.fromISO(data.slotTime).setZone("Africa/Nairobi");
          return {
            title: `Available: ${data.teacherName}`,
            start: dt.toJSDate(),
            end: dt.plus({ hours: 1 }).toJSDate(),
            type: "available",
          };
        });

        const courseEvents = bookingsSnap.docs.map((d) => {
          const data = d.data();
          const dt = DateTime.fromISO(data.startTime).setZone("Africa/Nairobi");
          return {
            title: `Course: ${data.studentName}`,
            start: dt.toJSDate(),
            end: dt.plus({ hours: 1 }).toJSDate(),
            type: data.status === "missed" ? "missed" : "course",
          };
        });

        setEvents([...trialEvents, ...slotEvents, ...courseEvents]);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
      }
    };

    fetchData();
  }, []);

  // Define color styles for event types
  const eventStyleGetter = useMemo(
    () => (event) => {
      let bg = "#ccc";
      if (event.type === "available") bg = "#FFD54F"; // yellow
      else if (event.type === "trial") bg = "#BA68C8"; // purple
      else if (event.type === "course") bg = "#66BB6A"; // green
      else if (event.type === "missed") bg = "#EF5350"; // red
      return {
        style: {
          backgroundColor: bg,
          color: "#fff",
          borderRadius: "6px",
          border: "none",
          padding: "4px",
        },
      };
    },
    []
  );

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-poppins">
      <h1 className="text-2xl font-bold text-primary mb-6">Class & Slot Calendar</h1>

      <div className="bg-white shadow-card rounded-xl p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day", "agenda"]}
          defaultView="week"
        />
      </div>
    </div>
  );
}
