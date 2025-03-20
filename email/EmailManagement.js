const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Log per capire se il server è stato avviato correttamente
console.log("Server avviato...");

// Configurazione transporter come nel tuo codice originale
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.user,
    pass: process.env.app_password,
  },
});

app.get("/api/test", (req, res) => {
  console.log("Richiesta GET alla rotta /api/test ricevuta");
  res.json({ message: "API funzionante!" });
  console.log("API funzionante!");
});

// Endpoint per inviare email
app.post("/api/send-email", async (req, res) => {
  console.log("Richiesta POST ricevuta alla rotta /api/send-email");

  // Verifica i dati che ricevi
  console.log("Dati ricevuti: ", req.body);

  try {
    const { to, subject, text, html } = req.body;

    const mailOptions = {
      from: {
        name: "Riccardo Orlando",
        address: process.env.user,
      },
      to: to || ["riccardoorlando08@gmail.com"],
      subject: subject || "Test Email",
      text: text || "Hello world?",
      html: html || "<b>Hello world?</b>",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Messaggio inviato: %s", info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.log("Errore durante l'invio dell'email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Log per assicurarti che il server stia ascoltando sulla porta corretta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});