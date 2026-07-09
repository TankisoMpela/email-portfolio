require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function main() {
    // 1. Determine SMTP configuration based on environment
    const isProd = process.env.NODE_ENV === 'production';
    let transporterConfig;

    if (isProd) {
        console.log('Sending email using Gmail (Production)...');
        transporterConfig = {
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        };
    } else {
        console.log('Sending email using Mailpit (Development)...');
        transporterConfig = {
            host: 'localhost',
            port: 1025,
            secure: false, // TLS not required for local Mailpit
            tls: {
                rejectUnauthorized: false
            }
        };
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    // 2. Read template file
    const templatePath = path.join(__dirname, 'templates', 'send-proof-of-work.html');
    let htmlContent;
    try {
        htmlContent = fs.readFileSync(templatePath, 'utf-8');
    } catch (err) {
        console.error(`Error reading template at ${templatePath}:`, err.message);
        process.exit(1);
    }

    // 3. Replace dynamic placeholders
    const recipientName = 'Brendon Groenewald';
    const portfolioUrl = process.env.PORTFOLIO_URL || 'https://tankiso-portfolio.vercel.app';
    
    htmlContent = htmlContent
        .replace(/\{\{recipient_name\}\}/g, recipientName)
        .replace(/\{\{portfolio_url\}\}/g, portfolioUrl);

    // 4. Set up email options
    const mailOptions = {
        from: `"Tankiso Mpela" <${isProd ? process.env.GMAIL_USER : 'tankisompela@gmail.com'}>`,
        to: process.env.RECIPIENT_EMAIL || 'bloemfontein@3dom.agency',
        subject: 'Examples of Work - Tankiso Mpela',
        html: htmlContent
    };

    // 5. Send the mail
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        if (!isProd) {
            console.log('Check Mailpit Web UI at http://localhost:8025 to view the intercepted email.');
        }
    } catch (err) {
        console.error('Error sending email:', err);
    }
}

main();
