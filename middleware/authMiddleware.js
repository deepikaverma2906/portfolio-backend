// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin'); // taaki role fetch kar sakein

// const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(403).json({ error: 'No token provided' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(403).json({ error: 'Invalid token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Find admin from DB to get role
//     const admin = await Admin.findById(decoded.id);
//     if (!admin) return res.status(404).json({ error: 'Admin not found' });

//     req.adminId = decoded.id;
//     req.userRole = admin.role; // yahi use hoga verifyAdmin me

//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// const verifyAdmin = (req, res, next) => {
//   if (req.userRole !== 'admin') {
//     return res.status(403).json({ message: 'Access denied: Admins only' });
//   }
//   next();
// };

// module.exports = {
//   verifyToken,
//   verifyAdmin
// };



const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'No or invalid token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // ✅ Store user info in req.user
    req.user = {
      id: admin._id,
      role: admin.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin
};
