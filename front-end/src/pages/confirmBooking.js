import { db } from "../firebase"; // your firebase init file
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function confirmBooking(formData, type = "trial") {
  const booking = {
    ...formData,
    type,
    status: "upcoming",
    createdAt: serverTimestamp(),
  };

  // Save to main bookings collection
  await addDoc(collection(db, "bookings"), booking);

  // If trial, also save to trialLeads
  if (type === "trial") {
    await addDoc(collection(db, "trialLeads"), {
      parentName: formData.parentName,
      email: formData.email,
      createdAt: serverTimestamp(),
    });
  }
}
