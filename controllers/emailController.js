// emailController.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.USER_PASS,
  },
});

// ✅ Extracted reusable function (no Express req/res)
export const sendWelcome = async ({ email, name }) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "🎉 Welcome to Twirl & Tie!",
    text: `Hello ${name || "Beautiful Soul"},\n\nWelcome to Twirl & Tie! We're honored to have you here.\n\nVisit us: https://twistandtie.vercel.app/\n\nWith love,\nThe Twirl & Tie Team`,
    html: `
      <html>
        <body style="font-family: 'Segoe UI'; background-color: #fff7ed; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background: white; border: 1px solid #fcd34d; border-radius: 16px; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.15);">
            <header style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; text-align: center;">
              <h1>🎀 Welcome to Twirl & Tie</h1>
              <p>Your Paranda Journey Begins</p>
            </header>
            <section style="padding: 30px 20px; color: #92400e; text-align: center;">
              <h2>Hello ${name || "Beautiful Soul"} ✨</h2>
              <p style="font-size: 16px;">
                Explore handcrafted Parandas, woven with tradition and love.
              </p>
              <a href="https://twistandtie.vercel.app/" style="margin-top: 20px; display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none;">
                🌸 Visit Our Store
              </a>
            </section>
            <footer style="padding: 20px; text-align: center; background: #fff7ed; border-top: 1px solid #fde68a;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">Follow us on social media 💫</p>
              <p style="font-size: 12px; color: #a16207;">© 2025 Twirl & Tie. Handcrafted with heart.</p>
            </footer>
          </div>
        </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

// ✅ Express route handler (keeps res.status etc)
export const sendWelcomeEmail = async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required", success: false });
  }

  try {
    const info = await sendWelcome({ email, name });
    console.log("Email sent:", info.messageId);
    res.status(200).json({
      message: "Welcome email sent successfully",
      success: true,
      messageId: info.messageId,
      recipient: email,
    });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({
      error: "Error sending email",
      success: false,
      details: err.message,
    });
  }
};
