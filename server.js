const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
// const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require("./config/swagger");
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const imageRoutes = require('./routes/imageRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const homeRoutes = require('./routes/homeRoutes');
const resumeRoutes = require('./routes/resumeRoutes')

// const uploads = require('./')
const path = require('path');
require('dotenv').config();


const app = express();
app.use(cors());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xssClean());

// Rate Limiting (optional, basic setup)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

app.use(limiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(morgan('combined'));
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads', {
  setHeaders: (res, path, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);     // /api/admin/data
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/image', imageRoutes);
app.use('/api/resume', resumeRoutes);

app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/home', homeRoutes);


// Connect to DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

 



