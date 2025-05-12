import generateEmailConfirmationTemplate from "./email-templait.js";
import transporter from "../config/nodemailer.js";
import {
  COMPANY_LOGO,
  COMPANY_ADDRESS,
  PRIMARY_COLOR,
  EMAIL_COMPANY_FROM,
  EMAIL_COMPANY_NAME,
} from "../config/env.js";
import { generateSessionConfirmationTemplate } from "./sessionemail.template.js";

// Function to send confirmation email
export async function sendConfirmationEmail(user, token) {
  // Validate that user and user.email exist
  if (!user || !user.email) {
    throw new Error("User email is required for sending confirmation email");
  }

  const confirmationUrl = `${
    process.env.BACKEND_URL || "http://localhost:5500"
  }/api/auth/confirm-email/${token}`;

  const emailHtml = generateEmailConfirmationTemplate({
    companyName: EMAIL_COMPANY_NAME || "Stay Fit",
    logoUrl:
      COMPANY_LOGO ||
      "https://res.cloudinary.com/dkjx65vc7/image/upload/v1745094944/stayfit2_kayqem.jpg",
    confirmationUrl,
    recipientName: `${user.firstName} ${user.lastName}`,
    companyAddress: COMPANY_ADDRESS || "123 Business Street, City, Country",
    primaryColor: PRIMARY_COLOR || "#B4E90E",
  });

  const mailOptions = {
    from: `"${EMAIL_COMPANY_NAME || "Stay Fit"}" <${
      EMAIL_COMPANY_FROM || "oteman.raja@gmail.com"
    }>`,
    to: user.email,
    subject: "Please Confirm Your Email",
    html: emailHtml,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendSessionNotifications(sessionData) {
  try {
    const { coach, client } = sessionData;
    
    // Company details (ideally from environment variables or database)
    const company = {
      name: EMAIL_COMPANY_NAME || "Stay Fit",
      logoUrl: COMPANY_LOGO || "https://res.cloudinary.com/dkjx65vc7/image/upload/v1745094944/stayfit2_kayqem.jpg",
      address: COMPANY_ADDRESS || "",
      primaryColor: PRIMARY_COLOR || "#B4E90E"
    };
    
    // Prepare email options for coach
    const coachMailOptions = {
      from: `"${company.name}" <${EMAIL_COMPANY_FROM}>`,
      to: coach.email,
      subject: `Session scheduled with ${client.firstName}`,
      html: generateSessionConfirmationTemplate({
        recipientType: 'coach',
        coach: coach,
        client: client,
        session: sessionData,
        company: company
      })
    };
    
    // Prepare email options for client
    const clientMailOptions = {
      from: `"${company.name}" <${EMAIL_COMPANY_FROM}>`,
      to: client.email,
      subject: `Your session with ${coach.firstName} is confirmed`,
      html: generateSessionConfirmationTemplate({
        recipientType: 'client',
        coach: coach,
        client: client,
        session: sessionData,
        company: company
      })
    };
    
    // Send both emails
    const [coachResult, clientResult] = await Promise.all([
      transporter.sendMail(coachMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);
    
    return {
      success: true,
      coachEmailId: coachResult.messageId,
      clientEmailId: clientResult.messageId
    };
  } catch (error) {
    console.error("Error sending session notifications:", error);
    return {
      success: false,
      error: error.message
    };
  }
} 


