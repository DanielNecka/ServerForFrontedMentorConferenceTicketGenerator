require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/sendTicket', async (req, res) => {
    const { email, image } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const htmlContent = `<html><head><style>body {font-family: Arial, sans-serif;background-color: rgb(18, 2, 53);padding: 20px;color: hsl(0, 0%, 100%);}.container {max-width: 600px;margin: 0 auto;padding: 30px;border-radius: 10px;box-shadow: 0 0 10px rgba(0,0,0,0.1);}.header {text-align: center;margin-bottom: 20px;}.ticket-image {width: 100%;border-radius: 8px;margin: 20px 0;}.footer {text-align: center;margin-top: 20px;color: hsla(252, 6%, 83%, 0.7);font-size: 14px;}</style></head><body><div class="container"><div class="header"><h1>Coding Conference 2025</h1><p>Your ticket is attached to this email</p></div><p>Hello,</p><p>Thank you for registering for the Coding Conference 2025! Your ticket is attached to this email.</p><p>You can also view your ticket below:</p>
    <img class="ticket-image" src="cid:ticketImage" alt="Conference Ticket">
    <p>We look forward to seeing you on January 31, 2025 in Austin, TX!</p><p>Best regards,<br>Coding Conference Team</p><div class="footer"><p>This email was sent automatically. Please do not reply.</p></div></div></body></html>`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Your Conference Ticket - Coding Conf 2025`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'conference-ticket.png',
                    content: image, 
                    encoding: 'base64',
                    cid: 'ticketImage' 
                }
            ]
        };

    transporter.sendMail(mailOptions);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});