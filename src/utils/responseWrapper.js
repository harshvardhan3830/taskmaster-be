/**
 * Standardized response wrapper for API responses
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {any} data - Data to be returned (optional)
 * @param {boolean} success - Success status (optional, defaults to true for 2xx codes)
 * @returns {Object} - Formatted JSON response
 */
export const responseWrapper = (res, statusCode, message, data = null, success = null) => {
    // Auto-determine success based on status code if not explicitly provided
    const isSuccess = success !== null ? success : statusCode >= 200 && statusCode < 300;
    
    const response = {
        message,
        success: isSuccess
    };
    
    // Only include data if it's provided
    if (data !== null) {
        response.data = data;
    }
    
    return res.status(statusCode).json(response);
};

/**
 * Success response wrapper
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {any} data - Data to be returned (optional)
 * @param {number} statusCode - HTTP status code (defaults to 200)
 */
export const successResponse = (res, message, data = null, statusCode = 200) => {
    return responseWrapper(res, statusCode, message, data, true);
};

/**
 * Error response wrapper
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {any} data - Error data (optional)
 * @param {number} statusCode - HTTP status code (defaults to 500)
 */
export const errorResponse = (res, message, data = null, statusCode = 500) => {
    return responseWrapper(res, statusCode, message, data, false);
};

/**
 * Created response wrapper (201)
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {any} data - Data to be returned
 */
export const createdResponse = (res, message, data) => {
    return responseWrapper(res, 201, message, data, true);
};

/**
 * Bad request response wrapper (400)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {any} data - Error data (optional)
 */
export const badRequestResponse = (res, message, data = null) => {
    return responseWrapper(res, 400, message, data, false);
};

/**
 * Unauthorized response wrapper (401)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {any} data - Error data (optional)
 */
export const unauthorizedResponse = (res, message, data = null) => {
    return responseWrapper(res, 401, message, data, false);
};

/**
 * Not found response wrapper (404)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {any} data - Error data (optional)
 */
export const notFoundResponse = (res, message, data = null) => {
    return responseWrapper(res, 404, message, data, false);
};
