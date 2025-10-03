import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc, Timestamp } from "firebase/firestore";

// Confirm and save booking
export async function confirmBooking(formData, type = "trial") {
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
//WILL BE PUT IN ADMINS DASHBOARD
// Cleanup old trial bookings older than 14 days
export async function cleanupOldTrials() {
  const twoWeeksAgo = Timestamp.fromMillis(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const q = query(
    collection(db, "bookings"),
    where("type", "==", "trial"),
    where("createdAt", "<=", twoWeeksAgo)
  );

  const snapshot = await getDocs(q);
  snapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, "bookings", docSnap.id));
  });
}
//USAGE
// import { cleanupOldTrials } from "./cleanup";

// cleanupOldTrials(); // deletes old trials
