// src/middleware/rateLimiter.js
import { rateLimit } from 'express-rate-limit';

/**
 * Creates a rate limiter middleware for specific routes
 * @param {number} maxRequests - Maximum number of requests allowed within the window
 * @param {number} windowMinutes - Time window in minutes
 * @param {string} message - Custom error message to display when limit is reached
 * @returns {Function} Express middleware function
 */
export const createRateLimiter = (maxRequests = 3, windowMinutes = 60, message = null) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // Convert minutes to milliseconds
    max: maxRequests, // Limit each IP to maxRequests requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: message || {
      success: false,
      message: `Too many requests. Please try again after ${windowMinutes} minutes.`
    },
    // Store to keep track of requests
    // By default this uses memory, but you might want to use Redis in production
    // Example Redis store: https://www.npmjs.com/package/rate-limit-redis
  });
};

/**
 * Pre-configured middleware for contact form submissions
 * Limits to 3 requests per hour per IP address
 */
export const contactFormLimiter = createRateLimiter(
  3, // Maximum 3 requests
  1440, // Within a 60 minute (24 hour) window
  {
    success: false,
    message: "You've submitted too many contact requests. Please wait 14 hour before trying again."
  }
);

/**
 * Pre-configured middleware for free session requests
 * Limits to 3 requests per day per IP address
 */
export const freeSessionLimiter = createRateLimiter(
  3, // Maximum 3 requests
  1440, // Within a 1440 minute (24 hour) window
  {
    success: false,
    message: "You've submitted too many free session requests. Please wait 24 hours before trying again."
  }
);

export default {
  createRateLimiter,
  contactFormLimiter,
  freeSessionLimiter
};