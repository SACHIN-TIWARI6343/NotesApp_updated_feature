
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email) => {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    throw new Error("RESEND_API_KEY and RESEND_FROM must be set in .env");
  }

  const response = await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: "Welcome to FY Money",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #222;">
        <h1>Welcome to FY Money</h1>
        <p>Thanks for signing up. Your account is now ready to use.</p>
        <p>If you have any questions, just reply to this email.</p>
      </div>
    `,
  });

  return response;
};

module.exports = {
  sendWelcomeEmail,
};