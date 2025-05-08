import transporter from "../utils/nodemailer.js";
import "dotenv/config";
// Email Template 1: User Auto-Response
export const sendUserConfirmation = async (userEmail, username) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: userEmail,
    subject: "Thanks for reaching out!",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8a2be2 0%, #ff69b4 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
        h1 { color: white; margin: 0; }
        .gradient-text { background: linear-gradient(135deg, #8a2be2 0%, #ff69b4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #777; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Thank You, ${username}!</h1>
      </div>
      <div class="content">
        <p>I've received your message and will get back to you within 24-48 hours.</p>
        <p>In the meantime, feel free to explore more of my work on my portfolio.</p>
        <p class="footer">This is an automated response. Please do not reply directly to this email.</p>
      </div>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Email Template 2: Admin Notification
export const sendAdminNotification = async (
  userEmail,
  username,
  userMessage
) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New message from ${username}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8a2be2 0%, #ff69b4 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 25px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
        h1 { color: white; margin: 0; font-size: 24px; }
        .message-box { background: white; border-left: 4px solid #8a2be2; padding: 15px; margin: 15px 0; }
        .button { display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #8a2be2 0%, #ff69b4 100%); color: white; text-decoration: none; border-radius: 4px; }
        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #777; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Portfolio Message</h1>
      </div>
      <div class="content">
        <p><strong>From:</strong> ${username} &lt;${userEmail}&gt;</p>
        <div class="message-box">
          <p>${userMessage}</p>
        </div>
        <p>
          <a href="mailto:${userEmail}" class="button">Reply to ${username}</a>
        </p>
        <p class="footer">Message received at ${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
