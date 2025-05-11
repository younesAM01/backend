// services/contactEmailService.js
import transporter from "../config/nodemailer.js";
import {
  COMPANY_ADDRESS,
  COMPANY_LOGO,
  DASHBOARD_URL,
  EMAIL_COMPANY_FROM,
  EMAIL_COMPANY_NAME,
} from "../config/env.js";
import { generateContactFormTemplate } from "./contact.template.js";

/**
 * Sends a contact form submission notification email to the admin
 * @param {Object} formData - Form data from the contact form
 * @param {Object} options - Additional options like recipient email, company info, etc.
 * @returns {Promise} - Promise that resolves when email is sent
 */
export async function sendContactFormEmail(formData, options = {}) {
  try {
    // Set default options if not provided
    const adminEmail = options.adminEmail || EMAIL_COMPANY_FROM;
    const companyInfo = options.company || {
      name: EMAIL_COMPANY_NAME,
      logoUrl: COMPANY_LOGO,
      dashboardUrl: DASHBOARD_URL,
      address: COMPANY_ADDRESS,
    };

    // Generate email template
    const htmlContent = generateContactFormTemplate({
      formData,
      company: companyInfo,
    });

    // Email options
    const mailOptions = {
      from: EMAIL_COMPANY_FROM,
      to: adminEmail,
      subject: `New Contact Form Message: ${formData.subject || "No Subject"}`,
      replyTo: formData.email, // Allow direct reply to sender
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Send acknowledgment email to user if requested
    if (options.sendAcknowledgment) {
      await sendAcknowledgmentEmail(formData);
    }

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending contact form email:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Sends an acknowledgment email to the person who submitted the form
 * @param {Object} formData - Form data from the contact form
 * @returns {Promise} - Promise that resolves when email is sent
 */
export async function sendAcknowledgmentEmail(formData) {
  try {
    const mailOptions = {
      from: EMAIL_COMPANY_FROM,
      to: formData.email,
      subject: `Thank you for contacting ${EMAIL_COMPANY_NAME}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Thank you for your message</h2>
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>We have received your inquiry regarding "${formData.subject || "your message"}" and will get back to you as soon as possible.</p>
          <p>For your records, here is a copy of your message:</p>
          <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            ${formData.message.replace(/\n/g, "<br>")}
          </div>
          <p>Best regards,</p>
          <p>The ${EMAIL_COMPANY_NAME} Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending acknowledgment email:", error);
    return false;
  }
}

export default { sendContactFormEmail, sendAcknowledgmentEmail };
