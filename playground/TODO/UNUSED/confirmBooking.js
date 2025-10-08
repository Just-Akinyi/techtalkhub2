const [status, setStatus] = React.useState(null); // 'success' | 'error' | null

const handleConfirm = async () => {
  try {
    const dataToSave = {
      ...formData,
      country,
      date: selectedDay.toISOString().split("T")[0],
      time: selectedSlot,
    };
    await confirmBooking(dataToSave, "trial");
    setStatus("success");
    // Clear fields
    setFormData({
      studentName: "",
      studentGrade: "",
      parentName: "",
      email: "",
      whatsapp: "",
      country: countries[0],
      date: "",
      time: "",
    });
    setSelectedSlot(null);
    setSelectedDay(new Date());
  } catch (error) {
    console.error(error);
    setStatus("error");
  }
};

// import { db } from "../firebase"; // your firebase init file
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// async function confirmBooking(formData, type = "trial") {
//   const booking = {
//     ...formData,
//     type,
//     status: "upcoming",
//     createdAt: serverTimestamp(),
//   };

//   // Save to main bookings collection
//   await addDoc(collection(db, "bookings"), booking);

//   // If trial, also save to trialLeads
//   if (type === "trial") {
//     await addDoc(collection(db, "trialLeads"), {
//       parentName: formData.parentName,
//       email: formData.email,
//       createdAt: serverTimestamp(),
//     });
//   }
// }
