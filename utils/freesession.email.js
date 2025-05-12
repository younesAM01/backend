// services/emailService.js
import transporter from "../config/nodemailer.js";
import { COMPANY_ADDRESS, COMPANY_LOGO, DASHBOARD_URL, EMAIL_COMPANY_FROM, EMAIL_COMPANY_NAME } from "../config/env.js";
import { generateFreeSessionRequestTemplate } from "./freesession.template.js";

/**
 * Sends a free session request notification email to the admin
 * @param {Object} userData - User data from the request form
 * @param {Object} options - Additional options like recipient email, company info, etc.
 * @returns {Promise} - Promise that resolves when email is sent
 */
export async function sendFreeSessionRequestEmail(userData, options = {}) {
  try {
    // Set default options if not provided
    const adminEmail = options.adminEmail || EMAIL_COMPANY_FROM;
    const companyInfo = options.company || {
      name: EMAIL_COMPANY_NAME,
      logoUrl: COMPANY_LOGO,
      dashboardUrl: DASHBOARD_URL,
      address: COMPANY_ADDRESS
    };

    // Generate email template
    const htmlContent = generateFreeSessionRequestTemplate({
      userData,
      company: companyInfo
    });

    // Email options
    const mailOptions = {
      from: EMAIL_COMPANY_FROM,
      to: adminEmail,
      subject: `New Free Session Request from ${userData.name}`,
      html: htmlContent
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error("Error sending free session request email:", error);
    
    return {
      success: false,
      error: error.message
    };
  }
}
