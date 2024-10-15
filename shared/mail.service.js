const nodemailer = require('nodemailer');

// Create a reusable function to send emails
async function sendEmail({ name, email, mobile, subject, message }) {
  try {
    // Create a transporter object using the SMTP settings of your email provider
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use other providers like Yahoo, Outlook, etc.
      auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-email-password'   // Your email password or an app-specific password
      }
    });

    // Email content template
    let mailOptions = {
      from: `"${name}" <${email}>`, // Sender address
      to: 'website-owner-email@example.com', // Your email address to receive contact requests
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://your-website-logo-url.com/logo.png" alt="Logo" style="width: 150px;">
          </div>
          <h2 style="color: #333;">New Contact Us Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #eee; padding: 10px; border-radius: 5px;">${message}</p>
          <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
            <p>&copy; 2024 MrWebOne. All rights reserved.</p>
            <p>Contact us at <a href="mailto:support@your-website.com">support@your-website.com</a></p>
          </footer>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
