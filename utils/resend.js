function generateContactFormTemplate(options) {
    const { company, contact, autoReply = false } = options;
  
    // Set brand colors using the provided color scheme
    const primaryColor = "#B4E90E"; // Bright lime green
    const secondaryColor = "#0D111A"; // Dark blue-black
    const companyAddress = company.address || "";
    const currentYear = new Date().getFullYear();
  
    // Format date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    // Arabic date formatting
    const arabicFormattedDate = currentDate.toLocaleDateString("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    // Determine if this is an auto-reply to the user or a notification to admin
    // English content
    let greeting, mainContent, emailTitle;
    // Arabic content
    let arabicGreeting, arabicMainContent, arabicEmailTitle;
  
    if (autoReply) {
      // Auto-reply email to the person who submitted the contact form
      // English content
      greeting = `Hello ${contact.firstName},`;
      emailTitle = "Thank You for Contacting Us";
      mainContent = `
          <p>We've received your message and appreciate you taking the time to contact us.</p>
          <p>Here's a summary of the information you provided:</p>
          <div class="message-details">
            <ul style="list-style-type: none; padding-left: 0; margin: 0;">
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Name:</strong> ${contact.firstName} ${contact.lastName || ''}</li>
              <li><strong>Email:</strong> ${contact.email}</li>
              ${contact.subject ? `<li><strong>Subject:</strong> ${contact.subject}</li>` : ''}
            </ul>
          </div>
          <div class="message-content">
            <p><strong>Your Message:</strong></p>
            <p style="background-color: #f7f9fc; padding: 15px; border-radius: 6px; border-left: 4px solid ${primaryColor};">${contact.message}</p>
          </div>
          <p>Our team will review your message and get back to you as soon as possible. Please allow 24-48 hours for a response.</p>
        `;

        
      // Arabic content
      arabicGreeting = `مرحباً ${contact.firstName}،`;
      arabicEmailTitle = "شكراً لتواصلك معنا";
      arabicMainContent = `
          <p>لقد تلقينا رسالتك ونقدر لك الوقت الذي خصصته للتواصل معنا.</p>
          <p>فيما يلي ملخص للمعلومات التي قدمتها:</p>
          <div class="message-details">
            <ul style="list-style-type: none; padding-right: 0; margin: 0; text-align: right;">
              <li><strong>التاريخ:</strong> ${arabicFormattedDate}</li>
              <li><strong>الاسم:</strong> ${contact.firstName} ${contact.lastName || ''}</li>
              <li><strong>البريد الإلكتروني:</strong> ${contact.email}</li>
              ${contact.subject ? `<li><strong>الموضوع:</strong> ${contact.subject}</li>` : ''}
            </ul>
          </div>
          <div class="message-content">
            <p><strong>رسالتك:</strong></p>
            <p style="background-color: #f7f9fc; padding: 15px; border-radius: 6px; border-right: 4px solid ${primaryColor};">${contact.message}</p>
          </div>
          <p>سيقوم فريقنا بمراجعة رسالتك والرد عليك في أقرب وقت ممكن. يرجى السماح بمدة 24-48 ساعة للرد.</p>
        `;
    } else {
      // Notification email to admin about a new contact submission
      // English content
      greeting = `Hello ${company.name} Team,`;
      emailTitle = "New Contact Form Submission";
      mainContent = `
          <p>You have received a new message through the contact form on your website.</p>
          <div class="message-details">
            <ul style="list-style-type: none; padding-left: 0; margin: 0;">
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Name:</strong> ${contact.firstName} ${contact.lastName || ''}</li>
              <li><strong>Email:</strong> ${contact.email}</li>
              ${contact.subject ? `<li><strong>Subject:</strong> ${contact.subject}</li>` : ''}
              ${contact.acceptTerms ? `<li><strong>Accepted Terms:</strong> Yes</li>` : ''}
            </ul>
          </div>
          <div class="message-content">
            <p><strong>Message:</strong></p>
            <p style="background-color: #f7f9fc; padding: 15px; border-radius: 6px; border-left: 4px solid ${primaryColor};">${contact.message}</p>
          </div>
          <p>Please respond to this inquiry at your earliest convenience.</p>
        `;

        
      // Arabic content
      arabicGreeting = `مرحباً فريق ${company.name}،`;
      arabicEmailTitle = "نموذج اتصال جديد";
      arabicMainContent = `
          <p>لقد تلقيت رسالة جديدة من خلال نموذج الاتصال على موقعك الإلكتروني.</p>
          <div class="message-details">
            <ul style="list-style-type: none; padding-right: 0; margin: 0; text-align: right;">
              <li><strong>التاريخ:</strong> ${arabicFormattedDate}</li>
              <li><strong>الاسم:</strong> ${contact.firstName} ${contact.lastName || ''}</li>
              <li><strong>البريد الإلكتروني:</strong> ${contact.email}</li>
              ${contact.subject ? `<li><strong>الموضوع:</strong> ${contact.subject}</li>` : ''}
              ${contact.acceptTerms ? `<li><strong>قبول الشروط:</strong> نعم</li>` : ''}
            </ul>
          </div>
          <div class="message-content">
            <p><strong>الرسالة:</strong></p>
            <p style="background-color: #f7f9fc; padding: 15px; border-radius: 6px; border-right: 4px solid ${primaryColor};">${contact.message}</p>
          </div>
          <p>يرجى الرد على هذا الاستفسار في أقرب وقت ممكن.</p>
        `;
      
    }
  
    // HTML Template with updated color scheme and bilingual content
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
            .message-details {
                background: #f7f9fc;
                padding: 18px;
                border-radius: 6px;
                margin: 20px 0;
            }
            .arabic-content .message-details {
                border-right: 4px solid ${primaryColor};
            }
            .english-content .message-details {
                border-left: 4px solid ${primaryColor};
            }
            .message-details ul li {
                margin-bottom: 8px;
            }
            .message-details ul li:last-child {
                margin-bottom: 0;
            }
            .message-details ul li strong {
                color: ${secondaryColor};
                font-weight: 600;
            }
            .message-content {
                margin: 20px 0;
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
                <img src="${company.logoUrl}" alt="${company.name} Logo" class="logo">
            </div>
            
            <!-- Arabic Content First -->
            <div class="arabic-content">
                <h2 class="arabic-title">${arabicEmailTitle}</h2>
                <p>${arabicGreeting}</p>
                ${arabicMainContent}
                
                
            </div>
            
            <div class="language-divider">
                <span>English | العربية</span>
            </div>
            
            <!-- English Content Second -->
            <div class="english-content">
                <h2 class="english-title">${emailTitle}</h2>
                <p>${greeting}</p>
                ${mainContent}
                
               
            </div>
            
            <div class="footer">
                <p>&copy; ${currentYear} ${company.name}. جميع الحقوق محفوظة | All rights reserved.</p>
                ${companyAddress ? `<p>${companyAddress}</p>` : ""}
                <p>هذه رسالة آلية، يرجى عدم الرد عليها مباشرة | This is an automated message, please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;
  }
  
  export { generateContactFormTemplate };