export const bookingSchema = {
  studentName: "",
  studentGrade: "",
  parentName: "",
  email: "",
  whatsapp: "",
  country: { code: "", name: "", dial: "", tz: "" },
  date: "",        // YYYY-MM-DD
  time: "",        // HH:mm
  duration: 60,    // in minutes
  type: "trial",   // "trial" or "course"
  status: "upcoming", // "upcoming", "attended", "missed"
  createdAt: null, // timestamp
};
