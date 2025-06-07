import User from '../models/user.mod.js';
import { validationResult } from 'express-validator';
import { comparePassword, hashPassword } from '../utils/bcrypthelper.js';
import { generateToken } from '../utils/jwtHelper.js';
import {
    successResponse,
    errorResponse,
    createdResponse,
    badRequestResponse,
    unauthorizedResponse,
} from '../utils/responseWrapper.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, 'Validation failed', errors.array());
        }

        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return badRequestResponse(res, 'Name, username, email, and password are required');
        }

        const existingUser = await User.findOne({ email });
        console.log('existing user ===>>> ', existingUser);
        if (existingUser) {
            return badRequestResponse(res, 'User already exists');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return createdResponse(res, 'User registered successfully', { user: userWithoutPassword, token });
    } catch (error) {
        console.error('Error during registration:', error);
        return errorResponse(res, 'Internal server error');
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, 'Validation failed', errors.array());
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return badRequestResponse(res, 'Email and password are required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return unauthorizedResponse(res, 'Invalid email or password');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return unauthorizedResponse(res, 'Invalid email or password');
        }

        const token = generateToken({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        return successResponse(res, 'Login successful', { user: userWithoutPassword, token });
    } catch (error) {
        console.error('Error during login:', error);
        return errorResponse(res, 'Internal server error');
    }
};

export const logout = async (req, res) => {
    try {
        // Invalidate the token or perform logout logic
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const forgotPassword = async (req, res) => {
    try {
        // Logic for handling forgot password
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const resetPassword = async (req, res) => {
    try {
        // Logic for resetting the password
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const verifyEmail = async (req, res) => {
    try {
        // Logic for verifying email
        res.status(200).json({ message: 'Email verification successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        // Logic to get user profile
        res.status(200).json({ message: 'User profile retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUserProfile = async (req, res) => {
    try {
        // Logic to update user profile
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const changePassword = async (req, res) => {
    try {
        // Logic to change user password
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        // Logic to get all users
        res.status(200).json({ message: 'All users retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserById = async (req, res) => {
    try {
        // Logic to get user by ID
        res.status(200).json({ message: 'User retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUserById = async (req, res) => {
    try {
        // Logic to update user by ID
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const deleteUserById = async (req, res) => {
    try {
        // Logic to delete user by ID
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserPreferences = async (req, res) => {
    try {
        // Logic to get user preferences
        res.status(200).json({ message: 'User preferences retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUserPreferences = async (req, res) => {
    try {
        // Logic to update user preferences
        res.status(200).json({ message: 'User preferences updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserAvatar = async (req, res) => {
    try {
        // Logic to get user avatar
        res.status(200).json({ message: 'User avatar retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUserAvatar = async (req, res) => {
    try {
        // Logic to update user avatar
        res.status(200).json({ message: 'User avatar updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserActivityLog = async (req, res) => {
    try {
        // Logic to get user activity log
        res.status(200).json({ message: 'User activity log retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUserActivityLog = async (req, res) => {
    try {
        // Logic to update user activity log
        res.status(200).json({ message: 'User activity log updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserNotifications = async (req, res) => {
    try {
        // Logic to get user notifications
        res.status(200).json({ message: 'User notifications retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUserNotifications = async (req, res) => {
    try {
        // Logic to update user notifications
        res.status(200).json({ message: 'User notifications updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
