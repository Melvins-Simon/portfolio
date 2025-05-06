import ejs from "ejs";
import "dotenv/config";
import { REPLY_EMAIL } from "../email/email_template.js";
import transporter from "./nodemailer.js";

const templateData = {
  subject: "Thank You for Your Message",
  recipientName: "John Doe",
  primaryColor: "#8E2DE2",
  secondaryColor: "#4A00E0",
  portfolioUrl: "https://yourportfolio.com",
  yourName: "Alex Johnson",
  yourTitle: "Web Developer & Designer",
  yourEmail: process.env.NODEMAILER_USER,
  yourPhone: "+1 (555) 123-4567",
  customMessage:
    "I typically respond within 24-48 hours. For urgent matters, please call me at the number below.",
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com/yourhandle" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile" },
    { name: "GitHub", url: "https://github.com/yourusername" },
  ],
};

const htmlEmail = ejs.render(REPLY_EMAIL, templateData);

const mailOptions = {
  from: process.env.NODEMAILER_USER,
  to: "melvinssimon@gmail.com",
  subject: templateData.subject,
  html: htmlEmail,
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
