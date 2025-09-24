const Home = require('../models/home');


exports.createHomeData = async (req, res) => {
    try {
      const home = new Home(req.body);
      await home.save();
      res.status(201).json(home);
    } catch (error) {
      res.status(500).json({ message: 'Error creating home data' });
    }
  };

exports.getHomeData = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching home data' });
  }
};

exports.updateHomeData = async (req, res) => {
  try {
    const home = await Home.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ message: 'Error updating home data' });
  }
};
