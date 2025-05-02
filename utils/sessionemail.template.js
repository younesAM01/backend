function generateSessionConfirmationTemplate(options) {
  const { recipientType, coach, client, session, company } = options;

  // Set brand colors using the provided color scheme
  const primaryColor = "#B4E90E"; // Bright lime green
  const secondaryColor = "#0D111A"; // Dark blue-black
  const companyAddress = company.address || "";
  const currentYear = new Date().getFullYear();

  // Format date
  const sessionDate = new Date(session.sessionDate);
  const formattedDate = sessionDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Arabic date formatting
  const arabicFormattedDate = sessionDate.toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine greeting and content based on recipient type
  // For English
  let greeting, mainContent;
  // For Arabic
  let arabicGreeting, arabicMainContent;

  if (recipientType === "coach") {
    // English content
    greeting = `Hello ${coach.firstName},`;
    mainContent = `
        <p>You have a new session scheduled with ${client.firstName}.</p>
        <p>Email: ${client.email}</p>
        <h3>Session Details:</h3>
        <div class="session-details">
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Time:</strong> ${session.sessionTime}</li>
            <li><strong>Location:</strong> ${session.location}</li>
            ${
              session.duration
                ? `<li><strong>Duration:</strong> ${session.duration}</li>`
                : ""
            }
            ${
              session.type
                ? `<li><strong>Type:</strong> ${session.type}</li>`
                : ""
            }
          </ul>
        </div>
        <p>Please be prepared and on time for this session. If you need to reschedule, please contact your client as soon as possible.</p>
      `;
      
    // Arabic content
    arabicGreeting = `مرحباً ${coach.firstName}،`;
    arabicMainContent = `
        <p>لديك جلسة جديدة مجدولة مع ${client.firstName}.</p>
        <p>البريد الإلكتروني: ${client.email}</p>
        <h3>تفاصيل الجلسة:</h3>
        <div class="session-details">
          <ul style="list-style-type: none; padding-right: 0; margin: 0; text-align: right;">
            <li><strong>التاريخ:</strong> ${arabicFormattedDate}</li>
            <li><strong>الوقت:</strong> ${session.sessionTime}</li>
            <li><strong>المكان:</strong> ${session.location}</li>
            ${
              session.duration
                ? `<li><strong>المدة:</strong> ${session.duration}</li>`
                : ""
            }
            ${
              session.type
                ? `<li><strong>النوع:</strong> ${session.type}</li>`
                : ""
            }
          </ul>
        </div>
        <p>يرجى الاستعداد والحضور في الموعد المحدد. إذا كنت بحاجة إلى إعادة جدولة الجلسة، يرجى الاتصال بالعميل في أقرب وقت ممكن.</p>
      `;
  } else {
    // client
    // English content
    greeting = `Hello ${client.firstName},`;
    mainContent = `
        <p>Your session with ${coach.firstName} has been scheduled successfully.</p>
        <p>Coach Email: ${coach.email}</p>
        
        <div class="session-details">
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Time:</strong> ${session.sessionTime}</li>
            <li><strong>Location:</strong> ${session.location}</li>
            ${
              session.duration
                ? `<li><strong>Duration:</strong> ${session.duration}</li>`
                : ""
            }
            ${
              session.type
                ? `<li><strong>Type:</strong> ${session.type}</li>`
                : ""
            }
          </ul>
        </div>
        <p>We look forward to seeing you! If you need to reschedule, please contact us at least 24 hours in advance.</p>
      `;
      
    // Arabic content
    arabicGreeting = `مرحباً ${client.firstName}،`;
    arabicMainContent = `
        <p>تم جدولة جلستك مع ${coach.firstName} بنجاح.</p>
        <p>البريد الإلكتروني للمدرب: ${coach.email}</p>
        
        <div class="session-details">
          <ul style="list-style-type: none; padding-right: 0; margin: 0; text-align: right;">
            <li><strong>التاريخ:</strong> ${arabicFormattedDate}</li>
            <li><strong>الوقت:</strong> ${session.sessionTime}</li>
            <li><strong>المكان:</strong> ${session.location}</li>
            ${
              session.duration
                ? `<li><strong>المدة:</strong> ${session.duration}</li>`
                : ""
            }
            ${
              session.type
                ? `<li><strong>النوع:</strong> ${session.type}</li>`
                : ""
            }
          </ul>
        </div>
        <p>نتطلع إلى رؤيتك! إذا كنت بحاجة إلى إعادة جدولة، يرجى الاتصال بنا قبل 24 ساعة على الأقل.</p>
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
          .session-details {
              background: #f7f9fc;
              padding: 18px;
              border-radius: 6px;
              margin: 20px 0;
          }
          .arabic-content .session-details {
              border-right: 4px solid ${primaryColor};
          }
          .english-content .session-details {
              border-left: 4px solid ${primaryColor};
          }
          .session-details ul li {
              margin-bottom: 8px;
          }
          .session-details ul li:last-child {
              margin-bottom: 0;
          }
          .session-details ul li strong {
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
              <img src="${company.logoUrl}" alt="${company.name} Logo" class="logo">
          </div>
          
          <!-- Arabic Content First -->
          <div class="arabic-content">
              <h2 class="arabic-title">تأكيد الجلسة</h2>
              <p>${arabicGreeting}</p>
              ${arabicMainContent}
              
              <div style="text-align: center; margin: 35px 0 15px;">
                  <a href="${
                    recipientType === "coach"
                      ? `${process.env.DASHBOARD_URL || "https://example.com/dashboard"}`
                      : `${process.env.CLIENT_PROFILE_URL || "https://example.com/profile"}`
                  }" 
                     class="button">
                     ${recipientType === "coach" ? "عرض في لوحة التحكم" : "عرض في ملفك الشخصي"}
                  </a>
              </div>
          </div>
          
          <div class="language-divider">
              <span>English | العربية</span>
          </div>
          
          <!-- English Content Second -->
          <div class="english-content">
              <h2 class="english-title">Session Confirmation</h2>
              <p>${greeting}</p>
              ${mainContent}
              
              <div style="text-align: center; margin: 35px 0 15px;">
                  <a href="${
                    recipientType === "coach"
                      ? `${process.env.DASHBOARD_URL || "https://example.com/dashboard"}`
                      : `${process.env.CLIENT_PROFILE_URL || "https://example.com/profile"}`
                  }" 
                     class="button">
                     ${recipientType === "coach" ? "View in Dashboard" : "View in your Profile"}
                  </a>
              </div>
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

export { generateSessionConfirmationTemplate };