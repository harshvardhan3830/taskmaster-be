import Project from '../models/project.mod';

export const createProject = async (req, res) => {
    const { name, description, members } = req.body;
    const project = new Project({ name, description, members });
    await project.save();
    res.status(201).json(project);
};

export const getProjects = async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
};

export const getProjectById = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.status(200).json(project);
};
