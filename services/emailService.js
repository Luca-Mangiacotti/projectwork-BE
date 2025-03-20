const nodemailer = require("nodemailer");

// Crea un test account usando Ethereal
async function createTestAccount() {
  return await nodemailer.createTestAccount();
}

async function sendOrderConfirmation(recipientEmail, orderDetails) {
  // Genera account di test
  const testAccount = await createTestAccount();

  // Crea il transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Invia email
  const info = await transporter.sendMail({
    from: '"Yuno Store" <noreply@yunostore.com>',
    to: recipientEmail,
    subject: "Conferma del tuo ordine",
    text: `Grazie per il tuo ordine!\n\nDettagli ordine:\n${JSON.stringify(
      orderDetails,
      null,
      2
    )}`,
    html: `<h1>Grazie per il tuo ordine!</h1>
              <p>I dettagli del tuo ordine:</p>
              <pre>${JSON.stringify(orderDetails, null, 2)}</pre>`,
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info;
}

module.exports = { sendOrderConfirmation };
