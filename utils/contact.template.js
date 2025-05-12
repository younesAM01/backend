function generateContactFormTemplate(options) {
    const { formData, company } = options;
  
    // Set brand colors
    const primaryColor = "#B4E90E"; // Bright lime green
    const secondaryColor = "#0D111A"; // Dark blue-black
    const companyAddress = company?.address || "";
    const currentYear = new Date().getFullYear();
  
    // Format current date and time
    const currentDate = new Date();
    const receivedTime = currentDate.toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit'
    });
    const receivedDate = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    // English content
    const mainContent = `
      <div class="alert">
        <p>A new contact form submission has been received!</p>
      </div>
      
      <p>Hello Admin,</p>
      <p>You have received a new message from <strong>${formData.firstName} ${formData.lastName}</strong>. Please review the details below and respond to the inquiry as soon as possible.</p>
      
      <h3>Contact Details:</h3>
      <div class="contact-details">
        <ul style="list-style-type: none; padding-left: 0; margin: 0;">
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Subject:</strong> ${formData.subject}</li>
          <li><strong>Received:</strong> ${receivedDate} at ${receivedTime}</li>
        </ul>
      </div>
  
      <h3>Message:</h3>
      <div class="message-content">
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p>${formData.acceptTerms ? 'The sender has accepted the terms and conditions.' : ''}</p>
      <p>Remember to respond to this inquiry within 24 hours to maintain high customer satisfaction.</p>
    `;
      
    // Arabic content
    const arabicMainContent = `
      <div class="alert">
        <p>تم استلام رسالة جديدة من نموذج الاتصال!</p>
      </div>
      
      <p>مرحباً المسؤول،</p>
      <p>لقد تلقيت رسالة جديدة من <strong>${formData.firstName} ${formData.lastName}</strong>. يرجى مراجعة التفاصيل أدناه والرد على الاستفسار في أقرب وقت ممكن.</p>
      
      <h3>تفاصيل الاتصال:</h3>
      <div class="contact-details">
        <ul style="list-style-type: none; padding-right: 0; margin: 0; text-align: right;">
          <li><strong>الاسم:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>البريد الإلكتروني:</strong> ${formData.email}</li>
          <li><strong>الموضوع:</strong> ${formData.subject}</li>
          <li><strong>تم الاستلام:</strong> ${receivedDate} في ${receivedTime}</li>
        </ul>
      </div>
  
      <h3>الرسالة:</h3>
      <div class="message-content">
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p>${formData.acceptTerms ? 'وافق المرسل على الشروط والأحكام.' : ''}</p>
      <p>تذكر الرد على هذا الاستفسار في غضون 24 ساعة للحفاظ على مستوى عالٍ من رضا العملاء.</p>
    `;
  
    // HTML Template
    return `<!DOCTYPE html>
    <html lang="ar-en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            }
            .header {
                text-align: center;
                padding: 25px 0 20px;
                border-bottom: 2px solid ${primaryColor};
                background-color: ${secondaryColor};
                border-radius: 8px 8px 0 0;
                margin: -20px -20px 20px;
            }
            .header h1 {
                color: ${primaryColor};
                margin-top: 15px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            .logo {
                max-width: 180px;
                height: auto;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            }
            .content {
                padding: 0 15px;
            }
            .arabic-content {
                direction: rtl;
                text-align: right;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 0 15px;
                margin-bottom: 40px;
            }
            .english-content {
                direction: ltr;
                text-align: left;
                border-top: 1px dashed #dddddd;
                padding-top: 30px;
                margin-top: 30px;
            }
            h2 {
                color: ${secondaryColor};
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 25px;
            }
            .arabic-title {
                border-right: 4px solid ${primaryColor};
                padding-right: 12px;
                text-align: right;
            }
            .english-title {
                border-left: 4px solid ${primaryColor};
                padding-left: 12px;
            }
            .contact-details, .message-content {
                background: #f7f9fc;
                padding: 18px;
                border-radius: 6px;
                margin: 20px 0;
            }
            .message-content {
                background: #f0f5ff;
            }
            .alert {
                background-color: #FFF8E1;
                border-left: 4px solid #FFC107;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
            }
            .arabic-content .alert {
                border-right: 4px solid #FFC107;
                border-left: none;
                text-align: right;
            }
            .arabic-content .contact-details, .arabic-content .message-content {
                border-right: 4px solid ${primaryColor};
                border-left: none;
            }
            .english-content .contact-details, .english-content .message-content {
                border-left: 4px solid ${primaryColor};
                border-right: none;
            }
            .contact-details ul li {
                margin-bottom: 8px;
            }
            .contact-details ul li:last-child {
                margin-bottom: 0;
            }
            .contact-details ul li strong {
                color: ${secondaryColor};
                font-weight: 600;
            }
            .button {
                display: inline-block;
                padding: 14px 28px;
                background-color: ${primaryColor};
                color: ${secondaryColor};
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                margin-top: 20px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.12);
                transition: all 0.3s ease;
            }
            .button:hover {
                background-color: #a5d40c;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }
            .footer {
                text-align: center;
                color: #666666;
                font-size: 12px;
                padding: 20px 0 10px;
                border-top: 1px solid #eeeeee;
                margin-top: 30px;
            }
            .language-divider {
                text-align: center;
                position: relative;
                height: 30px;
            }
            .language-divider:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                border-top: 1px dashed #dddddd;
            }
            .language-divider span {
                background-color: #ffffff;
                position: relative;
                display: inline-block;
                padding: 0 15px;
                color: #888;
                font-size: 14px;
            }
            @media only screen and (max-width: 480px) {
                .container {
                    width: 100%;
                    padding: 15px;
                }
                .header {
                    margin: -15px -15px 15px;
                    padding: 20px 0 15px;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    padding: 0 10px;
                }
                .button {
                    display: block;
                    text-align: center;
                    padding: 12px 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${company?.logoUrl || 'https://example.com/logo.png'}" alt="${company?.name || 'STAY FIT'} Logo" class="logo">
                <h1>${company?.name || 'STAY FIT'}</h1>
            </div>
            
            <!-- Arabic Content First -->
            <div class="arabic-content">
                <h2 class="arabic-title">رسالة اتصال جديدة</h2>
                ${arabicMainContent}                             
            </div>
            
            <div class="language-divider">
                <span>English | العربية</span>
            </div>
            
            <!-- English Content Second -->
            <div class="english-content">
                <h2 class="english-title">New Contact Message</h2>
                ${mainContent}
                
               
            </div>
            
            <div class="footer">
                <p>&copy; ${currentYear} ${company?.name || 'STAY FIT'}. جميع الحقوق محفوظة | All rights reserved.</p>
                ${companyAddress ? `<p>${companyAddress}</p>` : ""}
                <p>هذه رسالة آلية، يرجى عدم الرد عليها مباشرة | This is an automated message, please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;
  }
  

  
  export { generateContactFormTemplate };