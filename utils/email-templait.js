export default function generateEmailConfirmationTemplate(options) {
    const {
      companyName,
      logoUrl = 'https://res.cloudinary.com/dkjx65vc7/image/upload/v1745094944/stayfit2_kayqem.jpg',
      confirmationUrl,
      recipientName,
      companyAddress = '123 Business Street, City, Country'
    } = options;
  
    // Set brand colors
    const primaryColor = '#B4E90E'; // Bright lime green
    const secondaryColor = '#0D111A'; // Dark blue-black
    
    const currentYear = new Date().getFullYear();
    const greeting = recipientName ? `Hello ${recipientName},` : 'Hello,';
  
    return `<!DOCTYPE html>
  <html lang="en">
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
          .content h2 {
              color: ${secondaryColor};
              font-size: 24px;
              font-weight: 600;
              border-left: 4px solid ${primaryColor};
              padding-left: 12px;
              margin-bottom: 25px;
          }
          .verification-box {
              background: #f7f9fc;
              padding: 18px;
              border-radius: 6px;
              margin: 20px 0;
              border-left: 4px solid ${primaryColor};
          }
          .button {
              display: inline-block;
              padding: 14px 28px;
              background-color: ${primaryColor};
              color: ${secondaryColor};
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              margin-top: 10px;
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
          .link-container {
              background-color: #f7f9fc;
              padding: 12px;
              border-radius: 6px;
              border-left: 4px solid ${primaryColor};
              margin-top: 25px;
          }
          .confirmation-link {
              word-break: break-all; 
              font-size: 13px;
              color: #555;
              font-family: monospace;
          }
          .footer {
              text-align: center;
              color: #666666;
              font-size: 12px;
              padding: 20px 0 10px;
              border-top: 1px solid #eeeeee;
              margin-top: 30px;
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
              <img src="${logoUrl}" alt="${companyName} Logo" class="logo">
              
          </div>
          
          <div class="content">
              <h2>Please Confirm Your Email</h2>
              <p>${greeting}</p>
              <p>Thank you for signing up with us! To complete your registration and activate your account, please confirm your email address.</p>
              
              <div class="verification-box">
                <p>Simply click the button below to verify your email address:</p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${confirmationUrl}" class="button">Confirm Email</a>
                </p>
              </div>
              
              <p>If you did not create an account with ${companyName}, you can safely ignore this email.</p>
              
              <div class="link-container">
                <p><strong>Having trouble with the button?</strong> Copy and paste this URL into your web browser:</p>
                <p class="confirmation-link">
                    ${confirmationUrl}
                </p>
              </div>
          </div>
          
          <div class="footer">
              <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
              <p>${companyAddress}</p>
              <p>This is an automated message, please do not reply directly to this email.</p>
          </div>
      </div>
  </body>
  </html>`;
  }