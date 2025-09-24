const Project = require('../models/Project');

exports.addProject = async (req, res) => {
  try {
    const { title, description, techStack, projectUrl } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProject = new Project({ title, description, techStack, projectUrl, image });
    const saved = await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: saved });
  } catch (err) {
    res.status(500).json({ message: 'Error adding project', error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Project.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: 'Project updated', project: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};
