const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

exports.updateProfile = async (req, res) => {
  try {
    // ✅ Ensure user is authenticated
    const adminId = req.user.id;
    if (!adminId) {
      return res.status(401).json({ message: 'Unauthorized: Admin ID missing from request' });
    }

    const { name, email, currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // ✅ If updating password, validate current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to set new password' });
      }

      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      admin.password = await bcrypt.hash(newPassword, 10);
    }

    // ✅ Update other fields
    if (name) admin.name = name;
    if (email) admin.email = email;

    await admin.save();

    res.json({
      message: 'Profile updated successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating profile',
      error: err.message,
    });
  }
};
