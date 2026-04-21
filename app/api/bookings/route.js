const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Dummy database array to store bookings
let bookings = [];

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password' // Replace with your email password
    }
});

// Handle POST requests for new bookings
router.post('/bookings', (req, res) => {
    const { date, time, customerName, email, phone, projectDescription } = req.body;

    // Create a confirmation number
    const confirmationNumber = bookings.length + 1;

    // Store booking data
    const bookingData = {
        confirmationNumber,
        date,
        time,
        customerName,
        email,
        phone,
        projectDescription
    };
    bookings.push(bookingData);

    // Send confirmation emails
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: ['Karloz83@ymail.com', 'melodyparedes31@icloud.com'],
        subject: 'Booking Confirmation',
        text: `New booking confirmed:

Confirmation Number: ${confirmationNumber}
Date: ${date}
Time: ${time}
Customer Name: ${customerName}
Email: ${email}
Phone: ${phone}
Project Description: ${projectDescription}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error);
        }
        res.status(200).json({ success: true, confirmationNumber });
    });
});

module.exports = router;