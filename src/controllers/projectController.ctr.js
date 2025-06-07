import Project from '../models/project.mod.js';
import {
    createdResponse,
    successResponse,
    errorResponse,
    notFoundResponse,
    badRequestResponse,
} from '../utils/responseWrapper.js';

export const createProject = async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;

        const existingProject = await Project.findOne({ name, createdBy });

        if (existingProject) {
            return badRequestResponse(res, 'Project already exists');
        }

        const project = new Project({ name, description, createdBy });
        await project.save();

        return createdResponse(res, 'Project created successfully', project);
    } catch (error) {
        console.error('Error creating project:', error);
        return errorResponse(res, 'Failed to create project');
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return successResponse(res, 'Projects retrieved successfully', projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return errorResponse(res, 'Failed to retrieve projects');
    }
};

export const getUserProjects = async (req, res) => {
    try {
        const { createdBy } = req.query;
        const projects = await Project.find({ createdBy });
        return successResponse(res, 'Projects retrieved successfully', projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return errorResponse(res, 'Failed to retrieve projects');
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return notFoundResponse(res, 'Project not found');
        }

        return successResponse(res, 'Project retrieved successfully', project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return errorResponse(res, 'Failed to retrieve project');
    }
};
