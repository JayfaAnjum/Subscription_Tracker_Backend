import dayjs from "dayjs";
import { accountEmail } from "../config/nodemailer.js";
import { transporter } from "../config/nodemailer.js";
import { emailTemplates } from "./email.template.js";

export const sendReminderEmail = async ({ to, subscription }) => {
  if (!to) {
    throw new Error("Missing recipient email");
  }

  const subject = "Welcome ";

  const html = emailTemplates();
   
 

  const mailOptions = {
    from: accountEmail,
    to:"jayfamubarak@gmail.com",
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return;
    }

    console.log(" Email sent:", info.response);
  });
};