
const Image = require('../models/Image');
const path = require('path');

const uploadImage = async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });

    const savedImage = await newImage.save(); // DB me save

    res.status(201).json({
      message: 'Image uploaded and saved to DB!',
      image: savedImage,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading image',
      error: error.message,
    });
  }
};


const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get images', error: error.message });
  }
};

// const uploadResume = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No resume uploaded' });
//     }

//     const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    
//     // Aap DB me bhi save karna chahein to schema bana sakti hain. Filhal response de rahe hain:
//     res.status(201).json({
//       message: 'Resume uploaded successfully!',
//       resumeUrl: resumeUrl
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to upload resume', error: error.message });
//   }
// };


module.exports = {
  uploadImage,
  getAllImages,
  // uploadResume   
};
