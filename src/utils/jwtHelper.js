import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token with the given payload and secret.
 * @param {Object} payload - The payload to include in the token.
 * @param {string} secret - The secret key to sign the token.
 * @param {Object} [options] - Additional options for the token.
 * @param {number} [options.expiresIn] - The expiration time in seconds.
 * @return {string} - The generated JWT token.
 */

export const generateToken = (payload, secret, options = { expiresIn: '1h' }) => {
    if (!payload || !secret) {
        throw new Error('Payload and secret are required to generate a token');
    }
    return jwt.sign(payload, secret, options);
};
