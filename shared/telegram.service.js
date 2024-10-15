const axios = require('axios');


const botToken = process.env.TELEGRAM_BOT_KEY; // Replace with your Telegram bot token
const chatId = process.env.TELEGRAM_BOT_CHAT_ID; // Replace with your chat ID
const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

// Function to send a notification to Telegram
async function sendTelegramNotification({ username, email, mobile, subject, message }) {

    // PortfolioOct24_bot
    const text = `
    📬 New Contact Us Message:
    ------------------------------
    🧑 Name: ${username}
    📧 Email: ${email}
    📱 Mobile: ${mobile}
    📝 Subject: ${subject}
    💬 Message: ${message}
    ------------------------------
    Sent from MrWebOne website.
  `;

    try {
        await axios.post(telegramUrl, {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown',
        });
        console.log('Telegram notification sent successfully!');
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}

module.exports = sendTelegramNotification;
