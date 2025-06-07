import Task from '../models/tasks.mod.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, project, createdBy, assignedTo, status, priority, dueDate } = req.body;
        const task = new Task({ title, description, project, createdBy, assignedTo, status, priority, dueDate });
        await task.save();
        return res.status(201).json({ message: 'Task created successfully', data: task, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({ message: 'Tasks fetched successfully', data: tasks, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        return res.status(200).json({ message: 'Task fetched successfully', data: task, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, project, createdBy, assignedTo, status, priority, dueDate } = req.body;
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, project, createdBy, assignedTo, status, priority, dueDate },
            { new: true },
        );
        return res.status(200).json({ message: 'Task updated successfully', data: task, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: req.user._id,
                deletedReason: 'Task deleted by user',
                deletedComment: 'Task deleted by user',
            },
            { new: true },
        );
        return res.status(200).json({ message: 'Task deleted successfully', data: task, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
