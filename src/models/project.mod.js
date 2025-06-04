import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
        deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        deletedReason: { type: String },
        deletedComment: { type: String },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    },
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
