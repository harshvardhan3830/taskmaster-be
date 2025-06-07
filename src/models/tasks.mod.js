import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        dueDate: { type: Date },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
        deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        deletedReason: { type: String },
        deletedComment: { type: String },
    },
    {
        timestamps: true,
    },
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
