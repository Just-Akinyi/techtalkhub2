const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: "*" }); // ✅ explicitly allows all


admin.initializeApp();
const db = admin.firestore();

exports.verifyPayment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => { // ✅ wrap everything inside CORS
    const { reference, studentName } = req.body;
    const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!reference) {
      return res
        .status(400)
        .json({ status: "error", message: "No reference provided" });
    }

    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        { headers: { Authorization: `Bearer ${SECRET_KEY}` } }
      );

      const transaction = response.data.data;

      if (transaction.status === "success") {
        await db.collection("payments").doc(reference).set({
          reference: transaction.reference,
          amount: transaction.amount / 100,
          currency: transaction.currency,
          email: transaction.customer.email,
          full_name:
            transaction.customer.first_name + " " + transaction.customer.last_name,
          student_name: studentName || "Not provided",
          status: transaction.status,
          paid_at: transaction.paid_at
            ? new Date(transaction.paid_at)
            : new Date(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return res.json({ status: "success" });
      } else {
        return res.json({ status: "failed" });
      }
    } catch (err) {
      console.error("Verification error:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });
});
