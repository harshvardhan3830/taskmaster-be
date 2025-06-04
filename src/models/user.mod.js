import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['admin', 'project_manager', 'developer', 'qa'],
            default: 'developer',
        },
        avatar: { type: String, default: '' },
        preferences: {
            theme: { type: String, enum: ['light', 'dark'], default: 'light' },
            notifications: {
                email: { type: Boolean, default: true },
                push: { type: Boolean, default: true },
            },
            timezone: { type: String, default: 'UTC' },
        },
        isActive: { type: Boolean, default: true },
        lastLogin: { type: Date },
        emailVerified: { type: Boolean, default: false },
        verificationToken: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
export default User;
