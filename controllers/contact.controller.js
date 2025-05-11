// src/controllers/contactController.js
import { EMAIL_COMPANY_FROM } from "../config/env.js";
import { sendFreeSessionRequestEmail } from "../utils/freesession.email.js";
import {
  sendContactFormEmail,
  sendAcknowledgmentEmail,
} from "../utils/contact.email.js";

export async function contactController(req, res) {
  try {
    // Validate required fields
    const { firstName, lastName, email, subject, message, acceptTerms } =
      req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Form data object for email templates
    const formData = {
      firstName,
      lastName,
      email,
      subject: subject || "No Subject",
      message,
      acceptTerms: acceptTerms === true || acceptTerms === "true",
    };

    // Send admin notification email
    const emailResult = await sendContactFormEmail(formData, {
      sendAcknowledgment: false, // Don't send acknowledgment within this function
    });

    // Send acknowledgment email separately
    const acknowledgmentResult = await sendAcknowledgmentEmail(formData);

    if (emailResult.success) {
      return res.status(200).json({
        success: true,
        message:
          "Your message has been sent successfully. We'll be in touch soon!",
        acknowledgmentSent: acknowledgmentResult,
      });
    } else {
      throw new Error("Failed to process your request");
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({
      success: false,
      message:
        "There was a problem sending your message. Please try again later.",
    });
  }
}

export async function handleFreeSessionRequest(req, res) {
  try {
    const userData = {
      city: req.body.city,
      location: req.body.location,
      date: req.body.date,
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      timeRange: req.body.timeRange,
    };

    // Send notification email to admin
    const emailResult = await sendFreeSessionRequestEmail(userData, {
      adminEmail: EMAIL_COMPANY_FROM, // Optional, defaults to EMAIL_COMPANY_FROM
    });

    if (!emailResult.success) {
      console.error("Failed to send admin notification email");
    }

    // Continue with your API response...
    res
      .status(200)
      .json({ success: true, message: "Free session request received" });
  } catch (error) {
    console.error("Error handling free session request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default contactController;
