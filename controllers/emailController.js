import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or another service like 'yahoo'
  auth: {
    user: process.env.USER, // Your email address
    pass: process.env.USER_PASS, // Your email password (use app password for Gmail)
  },
});

// Route to send a welcome email
export const sendWelcomeEmail = async (req, res) => {
  try {
    const { email, name } = req.body; // Assuming you want to personalize the email with a name.

    // Validate email
    if (!email) {
      return res.status(400).json({ 
        error: "Email is required",
        success: false 
      });
    }

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Welcome to Twirl & Tie - Your Paranda Journey Begins!",
      text: `Hello ${name || "Beautiful Soul"},
    
    Thank you for joining the Twirl & Tie family! We're thrilled to have you on this journey of celebrating traditional Indian heritage through our handcrafted Parandas.
    
    With Twirl & Tie, you can:
    - Discover authentic, handcrafted Parandas made with love
    - Celebrate the timeless elegance of traditional Indian hair accessories
    - Experience premium quality materials and craftsmanship
    - Connect with your cultural heritage in style
    
    We're putting the finishing touches on something truly special for you. Get ready to embrace tradition with modern elegance!
    
    Stay tuned for our official launch - you'll be among the first to know!
    
    With love and tradition,
    The Twirl & Tie Team
    
    P.S. Follow us on social media for sneak peeks and behind-the-scenes content!`,
    
      html: `
        <html>
          <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #92400e; background-color: #fef7ed; padding: 20px; margin: 0;">
            <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%); border: 2px solid #f59e0b; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);">
              
              <!-- Header -->
              <header style="background: linear-gradient(135deg, #92400e 0%, #b45309 100%); color: white; padding: 30px 20px; text-align: center; position: relative;">
                <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.3);">
                  <span style="font-size: 36px; font-weight: bold;">T&T</span>
                </div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">Twirl & Tie</h1>
                <p style="margin: 5px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; opacity: 0.9;">PARANDA</p>
              </header>
              
              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #92400e; font-size: 24px; font-weight: 300; margin-bottom: 20px; text-align: center;">
                  Hello ${name || "Beautiful Soul"} ✨
                </h2>
                
                <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #b45309;">
                  Thank you for joining the <strong>Twirl & Tie family</strong>! We're thrilled to have you on this journey of celebrating traditional Indian heritage through our handcrafted Parandas.
                </p>
                
                <div style="background: rgba(255,255,255,0.6); border-radius: 15px; padding: 25px; margin: 25px 0; border-left: 4px solid #f59e0b;">
                  <h3 style="color: #92400e; margin-top: 0; font-size: 18px;">With Twirl & Tie, you can:</h3>
                  <ul style="padding-left: 0; list-style: none;">
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                      <span style="position: absolute; left: 0; color: #f59e0b; font-size: 18px;">🎨</span>
                      Discover authentic, handcrafted Parandas made with love
                    </li>
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                      <span style="position: absolute; left: 0; color: #f59e0b; font-size: 18px;">✨</span>
                      Celebrate the timeless elegance of traditional Indian hair accessories
                    </li>
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                      <span style="position: absolute; left: 0; color: #f59e0b; font-size: 18px;">💎</span>
                      Experience premium quality materials and craftsmanship
                    </li>
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                      <span style="position: absolute; left: 0; color: #f59e0b; font-size: 18px;">🏛️</span>
                      Connect with your cultural heritage in style
                    </li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p style="font-size: 18px; color: #92400e; margin-bottom: 15px;">
                    We're putting the finishing touches on something truly special for you.
                  </p>
                  <p style="font-size: 16px; color: #b45309; font-style: italic;">
                    Get ready to embrace tradition with modern elegance!
                  </p>
                </div>
                
                <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 12px; padding: 20px; text-align: center; margin: 25px 0;">
                  <p style="color: white; font-size: 16px; margin: 0; font-weight: 500;">
                    🚀 Stay tuned for our official launch - you'll be among the first to know!
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <footer style="background: #f3f4f6; text-align: center; padding: 25px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px; font-size: 16px; color: #92400e; font-weight: 500;">
                  With love and tradition,<br>
                  <strong>The Twirl & Tie Team</strong> 💝
                </p>
                <p style="margin: 15px 0 0; font-size: 14px; color: #6b7280; font-style: italic;">
                  P.S. Follow us on social media for sneak peeks and behind-the-scenes content!
                </p>
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #d1d5db;">
                  <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                    © 2025 Twirl & Tie. Crafted with love for tradition.
                  </p>
                </div>
              </footer>
            </div>
          </body>
        </html>
      `,
    };  

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({ 
      message: "Welcome email sent successfully",
      success: true,
      messageId: info.messageId,
      recipient: email
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: "Error sending email",
      success: false,
      details: error.message 
    });
  }
};