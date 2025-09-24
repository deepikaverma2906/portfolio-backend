const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


// 🔐 Secret key from environment
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // if (admin.password !== password) {
    //   return res.status(400).json({ message: 'Invalid password' });
    // }

    const isMatch = await bcrypt.compare(password, admin.password);
if (!isMatch) {
  return res.status(400).json({ message: 'Invalid password' });
}


    // ✅ Token generate
    // const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    const token = jwt.sign(
      { id: admin._id, role: admin.role },  // include role here
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        _id: admin._id,
        email: admin.email,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// exports.register = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Check if any admin already exists (not just same email)
//     const existingAdmin = await Admin.findOne();
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists. Only one admin allowed.' });
//     }

//     // ✅ Create new admin
//     const newAdmin = new Admin({ email, password, role: 'admin' });
//     await newAdmin.save();

//     // ✅ Generate token with role
//     const token = jwt.sign(
//       { id: newAdmin._id, role: newAdmin.role },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(201).json({
//       message: 'Registration successful',
//       token,
//       admin: {
//         _id: newAdmin._id,
//         email: newAdmin.email,
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong', error: error.message });
//   }
// };
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if any admin already exists (not just same email)
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists. Only one admin allowed.' });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new admin with hashed password
    const newAdmin = new Admin({ email, password: hashedPassword, role: 'admin' });
    await newAdmin.save();

    // ✅ Generate token with role
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      admin: {
        _id: newAdmin._id,
        email: newAdmin.email,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};





exports.sendResetCode = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetCode = code;
    admin.resetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await admin.save();

    // ✅ Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'deeparv296@gmail.com',
        pass: 'rbja tisp bwdk fjmo', // Use App Password if 2FA is on
      },
    });

    const mailOptions = {
      from: 'deeparv296@gmail.com',
      to: email,
      subject: 'Your Reset Code',
      text: `Your reset code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Reset code sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending code', error: err.message });
  }
};







// Forgot Password: Reset using code
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (
      !admin.resetCode ||
      admin.resetCode !== code ||
      new Date() > new Date(admin.resetCodeExpiry)
    ) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.resetCode = undefined;
    admin.resetCodeExpiry = undefined;
    await admin.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};



