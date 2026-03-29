import Skill from "../models/Skill.js";

export const getAllSkills = async (req, res) => {
  const skills = await Skill.find().sort({ displayOrder: 1, createdAt: -1 });

  res.json({
    success: true,
    count: skills.length,
    data: skills,
  });
};

export const createSkill = async (req, res) => {
  const { name, icon, category, level, displayOrder } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: "Name and category are required",
    });
  }

  const skill = await Skill.create({
    name,
    icon,
    category,
    level,
    displayOrder,
  });

  res.status(201).json({
    success: true,
    message: "Skill created successfully",
    data: skill,
  });
};

export const updateSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    message: "Skill updated successfully",
    data: updatedSkill,
  });
};

export const deleteSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  await Skill.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Skill deleted successfully",
  });
};
