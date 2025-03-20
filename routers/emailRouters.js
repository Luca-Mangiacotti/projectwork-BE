const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { sendOrderConfirmation } = require("../services/emailService");

router.post("/send-confirmation", async (req, res) => {
  try {
    const { email } = req.body;

    // Qui puoi recuperare i dettagli dell'ordine dal tuo database
    // Per esempio:
    const orderDetails = {
      orderId: "ORD-" + Date.now(),
      items: req.body.items || [],
      total: req.body.total || 0,
    };

    const info = await sendOrderConfirmation(email, orderDetails);
    const previewUrl = nodemailer.getTestMessageUrl(info);

    res.json({
      message: "Email inviata con successo",
      previewUrl: previewUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
