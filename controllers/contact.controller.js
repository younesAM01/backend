// src/controllers/contactController.js
import { Resend } from 'resend';
import { COMPANY_ADDRESS, COMPANY_LOGO, DASHBOARD_URL, EMAIL_COMPANY_FROM, EMAIL_COMPANY_NAME, RESEND_API_KEY } from '../config/env.js';
import { generateContactFormTemplate } from '../utils/resend.js';
import { sendFreeSessionRequestEmail } from '../utils/freesession.email.js';

const resend = new Resend(RESEND_API_KEY);

export const contactController = {
  sendContactEmail: async (req, res) => {
    try {
      // Extract data from request body
      const { firstName, lastName, email, subject, message, acceptTerms } = req.body;
      
      // Validate required fields
      if (!firstName || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name, email, and message are required' 
        });
      }
      
      // Company information
      const company = {
        name: EMAIL_COMPANY_NAME,
        logoUrl: COMPANY_LOGO,
        address: COMPANY_ADDRESS,
        websiteUrl: DASHBOARD_URL
      };
      
      // Contact information for template
      const contactInfo = {
        firstName,
        lastName,
        email,
        subject,
        message,
        acceptTerms
      };
      
      // Generate HTML for admin notification
      const adminHtml = generateContactFormTemplate({
        company,
        contact: contactInfo,
        autoReply: false
      });
      
      // Generate HTML for auto-reply to the sender
      // const autoReplyHtml = generateContactFormTemplate({
      //   company,
      //   contact: contactInfo,
      //   autoReply: true
      // });
      
      // Send notification email to admin
      const { data: adminData, error: adminError } = await resend.emails.send({
        from: 'Stay Fit <onboarding@resend.dev>', // Update with your domain when verified
        to: ['oth.gothr@gmail.com'], // Replace with your target email
        reply_to: email,
        subject: `New Contact Form: ${subject || `Message from ${firstName} ${lastName || ''}`}`,
        html: adminHtml,
      });

      if (adminError) {
        console.error('Admin notification email failed:', adminError);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to send email notification' 
        });
      }
      
      // Send auto-reply to the sender
      // const { data: replyData, error: replyError } = await resend.emails.send({
      //   from: 'Stay Fit <onboarding@resend.dev>', // Update with your domain when verified
      //   to: [email],
      //   subject: `Thank you for contacting us, ${firstName}`,
      //   html: autoReplyHtml,
      // });
      
      // if (replyError) {
      //   console.error('Auto-reply email failed:', replyError);
      //   // We'll still return success since the admin notification went through
      //   // But we'll log the error for troubleshooting
      // }

      return res.status(200).json({ 
        success: true, 
        // data: { admin: adminData, reply: replyData },
        data: { admin: adminData },
        message: 'Thank you for your message. We will get back to you soon.' 
      });
    } catch (error) {
      console.error('Contact controller error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  },
};

export async function handleFreeSessionRequest(req, res) {
  try {
    const userData = {
      city: req.body.city,
      date: req.body.date,
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      timeRange: req.body.timeRange
    };
    
    // Send notification email to admin
    const emailResult = await sendFreeSessionRequestEmail(userData, {
      adminEmail: EMAIL_COMPANY_FROM // Optional, defaults to EMAIL_COMPANY_FROM
    });
    
    if (!emailResult.success) {
      console.error("Failed to send admin notification email");
    }
    
    // Continue with your API response...
    res.status(200).json({ success: true, message: "Free session request received" });
  } catch (error) {
    console.error("Error handling free session request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default contactController;
