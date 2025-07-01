require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/sendTicket', async (req, res) => {
    const { email, html } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Ticket for Coding Conf. Jan 31, 2025 / Austin, TX`,
        text: html,
        attachments: [
            {
                filename: 'ticket.html',
                content: html,
                contentType: 'text/html'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Błąd wysyłki maila' });
        } else {
            res.json({ status: 'OK' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});