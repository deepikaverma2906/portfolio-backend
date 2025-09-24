const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
require('dotenv').config();

exports.contactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // 📝 Step 1: Save to DB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // 📧 Step 2: Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin mail
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '📬 New Contact Message',
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Thank-you mail to sender
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting!',
      html: `<p>Hi ${name},<br/>Thank you for reaching out! I'll get back to you soon.</p>`,
    });

    res.status(200).json({ message: 'Message saved and emails sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
  }
};
