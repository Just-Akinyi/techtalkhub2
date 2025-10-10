import React, { useState } from "react";
import { DateTime } from "luxon";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import { confirmBooking } from "../utils/booking";

const countries = [
  { code: "KE", name: "Kenya", dial: "+254", tz: "Africa/Nairobi", flag: "🇰🇪" },
  { code: "UG", name: "Uganda", dial: "+256", tz: "Africa/Kampala", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", dial: "+255", tz: "Africa/Dar_es_Salaam", flag: "🇹🇿" },
  { code: "NG", name: "Nigeria", dial: "+234", tz: "Africa/Lagos", flag: "🇳🇬" },
  { code: "ZA", name: "South Africa", dial: "+27", tz: "Africa/Johannesburg", flag: "🇿🇦" },
];

export default function BookClassPage() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [country, setCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({
    studentName: "",
    studentGrade: "",
    parentName: "",
    email: "",
    whatsapp: "",
    country: countries[0],
    date: "",
    time: "",
  });
  const [touched, setTouched] = useState({ email: false, whatsapp: false });

  const slots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "studentName" || name === "parentName") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const formatSlot = (slot) => {
    const [h, m] = slot.split(":");
    return DateTime.fromObject(
      {
        year: selectedDay.getFullYear(),
        month: selectedDay.getMonth() + 1,
        day: selectedDay.getDate(),
        hour: parseInt(h),
        minute: parseInt(m),
      },
      { zone: "Africa/Nairobi" }
    )
      .setZone(country.tz)
      .toFormat("HH:mm");
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validPhone = () => {
    try {
      const fullNumber = country.dial + formData.whatsapp;
      const parsed = parsePhoneNumberFromString(fullNumber);
      return parsed && parsed.isValid();
    } catch {
      return false;
    }
  };

  const isValidForm =
    formData.studentName &&
    formData.studentGrade &&
    formData.parentName &&
    isValidEmail(formData.email) &&
    validPhone() &&
    selectedSlot;

  const handleConfirm = async () => {
    const dataToSave = {
      ...formData,
      country,
      date: selectedDay.toISOString().split("T")[0],
      time: selectedSlot,
    };
    await confirmBooking(dataToSave, "trial");
    alert("Trial booked successfully!");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-poppins">
      <button className="mb-6 text-primary font-semibold hover:underline" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* Booking Form */}
          <div className="bg-white shadow-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Book a Trial Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="studentName" placeholder="Student Name" className="border rounded-lg p-2" value={formData.studentName} onChange={handleInput} />
              <select name="studentGrade" className="border rounded-lg p-2" value={formData.studentGrade} onChange={handleInput}>
                <option value="">Select Grade</option>
                <option value="K-2">K-2</option>
                <option value="3-5">Grade 3-5</option>
                <option value="6-8">Grade 6-8</option>
                <option value="9-12">High School (9-12)</option>
              </select>
              <input name="parentName" placeholder="Parent Name" className="border rounded-lg p-2" value={formData.parentName} onChange={handleInput} />
              <input name="email" placeholder="Parent Email" type="email" className={`border rounded-lg p-2 ${touched.email && !isValidEmail(formData.email) ? "border-red-500" : ""}`} value={formData.email} onChange={handleInput} onBlur={() => setTouched({ ...touched, email: true })} />
              <div className={`flex border rounded-lg overflow-hidden ${touched.whatsapp && !validPhone() ? "border-red-500" : ""}`}>
                <select className="bg-gray-100 px-2" value={country.code} onChange={(e) => setCountry(countries.find((c) => c.code === e.target.value))}>
                  {countries.map((c) => (<option key={c.code} value={c.code}>{c.flag} {c.dial}</option>))}
                </select>
                <input name="whatsapp" placeholder="WhatsApp Number" className="flex-1 p-2" value={formData.whatsapp} onChange={handleInput} onBlur={() => setTouched({ ...touched, whatsapp: true })} />
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white shadow-card rounded-xl p-6">
            <div className="flex justify-between items-start gap-6">
              <div className="flex gap-3">
                {days.map((d, i) => {
                  const label = d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
                  return (
                    <button key={i} onClick={() => { setSelectedDay(d); setSelectedSlot(null); }} className={`px-4 py-2 rounded-lg shadow-btn ${selectedDay.toDateString() === d.toDateString() ? "bg-primary text-white" : "bg-gray-100 text-text"}`}>
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-text">Timezone: {country.name}</span>
                <span className="text-sm text-gray-500">{country.tz}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {slots.map((s, i) => (
                <button key={i} onClick={() => setSelectedSlot(s)} className={`px-4 py-2 rounded-lg ${selectedSlot === s ? "bg-secondary text-white" : "bg-gray-100 text-text"}`}>
                  {formatSlot(s)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-primary text-white rounded-xl shadow-card p-6 space-y-4">
          <h2 className="text-xl font-bold">Booking Summary</h2>
          <p><strong>Student:</strong> {formData.studentName || "—"}</p>
          <p><strong>Grade:</strong> {formData.studentGrade || "—"}</p>
          <p><strong>Parent:</strong> {formData.parentName || "—"}</p>
          <p><strong>Email:</strong> {formData.email || "—"}</p>
          <p><strong>WhatsApp:</strong> {country.flag} {country.dial} {formData.whatsapp || "—"}</p>
          <p><strong>Date:</strong> {selectedDay.toDateString()}</p>
          <p><strong>Time:</strong> {selectedSlot ? formatSlot(selectedSlot) : "—"}</p>
          <p><strong>Timezone:</strong> {country.name} ({country.tz})</p>
          <p><strong>Duration:</strong> 1 hour</p>
          <button className="w-full mt-4 py-2 rounded-lg bg-accent font-semibold disabled:opacity-50" disabled={!isValidForm} onClick={handleConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
