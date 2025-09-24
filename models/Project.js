const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // image path or URL
    techStack: { type: [String] }, // list of technologies used
    //   projectUrl: { type: String }, // live demo or GitHub URL
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);
