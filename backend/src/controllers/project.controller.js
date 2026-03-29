import Project from "../models/Project.js";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: projects.length,
    data: projects,
  });
};

export const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.json({
    success: true,
    data: project,
  });
};

export const createProject = async (req, res) => {
  const {
    title,
    slug,
    shortDescription,
    fullDescription,
    techStack,
    githubUrl,
    liveUrl,
    coverImage,
    featured,
    category,
  } = req.body;

  if (!title || !slug || !shortDescription) {
    return res.status(400).json({
      success: false,
      message: "Title, slug and shortDescription are required",
    });
  }

  const existingProject = await Project.findOne({ slug });

  if (existingProject) {
    return res.status(400).json({
      success: false,
      message: "Project with this slug already exists",
    });
  }

  const project = await Project.create({
    title,
    slug,
    shortDescription,
    fullDescription,
    techStack,
    githubUrl,
    liveUrl,
    coverImage,
    featured,
    category,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  await Project.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Project deleted successfully",
  });
};
