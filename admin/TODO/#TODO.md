1️⃣ Create the function file
FOR IT TO BE  AUTOMATIC

In functions/ (Firebase functions folder), create cleanupOldTrials.js:

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.cleanupOldTrials = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const twoWeeksAgo = admin.firestore.Timestamp.fromMillis(
      Date.now() - 14 * 24 * 60 * 60 * 1000
    );

    const snapshot = await db
      .collection("bookings")
      .where("type", "==", "trial")
      .where("createdAt", "<=", twoWeeksAgo)
      .get();

    snapshot.forEach(async (docSnap) => {
      await db.collection("bookings").doc(docSnap.id).delete();
      console.log(`Deleted trial booking: ${docSnap.id}`);
    });

    return null;
  });

2️⃣ Deploy function
firebase deploy --only functions:cleanupOldTrials

3️⃣ Notes

This runs daily automatically.

It only deletes trial bookings older than 14 days.

Course bookings are unaffected.


After