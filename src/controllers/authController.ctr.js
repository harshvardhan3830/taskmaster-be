import User from '../models/user.mod.js';
import { validationResult } from 'express-validator';
import { comparePassword, hashPassword } from '../utils/bcrypthelper.js';
import { generateToken } from '../utils/jwtHelper.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;
        // Validate input data
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        // Check if user already exists
        const existingUser = await User.find({ email });

        console.log('existingUser', existingUser);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }
        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return res
            .status(201)
            .json({ message: 'User registered successfully', data: { user: newUser, token }, success: true });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        // Validate input data
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Compare the password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const { password: _, ...userWithoutPassword } = user.toObject();
        // Generate a token
        const token = generateToken({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

        return res
            .status(200)
            .json({ message: 'Login successful', data: { user: userWithoutPassword, token }, success: true });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
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
