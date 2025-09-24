const Resume = require('../models/resume');
const path = require('path');
const fs = require('fs');



const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    const newResume = new Resume({
      filename: req.file.filename,
      path: `/uploads/resumes/${req.file.filename}`
    });

    await newResume.save();

    res.status(201).json({
      message: 'Resume uploaded and saved successfully!',
      resume: newResume
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload resume', error: error.message });
  }
};

const getResume = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ uploadedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
};

const downloadResume = async (req, res) => {
  try {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, '../uploads/resumes', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');

    res.download(filePath); // this will force download
  } catch (error) {
    res.status(500).json({ message: 'Download failed', error: error.message });
  }
};


module.exports = {
  uploadResume,
  getResume,
  downloadResume,
};
