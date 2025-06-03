import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @return {Promise<string>} - The hashed password.
 */

export const hashPassword = async (password) => {
    if (!password) {
        throw new Error('Password is required for hashing');
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/**
 * Compares a password with a hashed password.
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @return {Promise<boolean>} - True if the passwords match, false otherwise.
 */
export const comparePassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw new Error('Both password and hashed password are required for comparison');
    }
    return await bcrypt.compare(password, hashedPassword);
};
/**
 * Generates a random token for password reset or email verification.
 * @return {string} - A random token.
 */
export const generateToken = () => {
    return require('crypto').randomBytes(32).toString('hex');
};
