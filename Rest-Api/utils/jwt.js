

const jwt = require('jsonwebtoken');
const config = require('../config/config');
/**
 * Generates a JSON Web Token for a user.
 * @param {object} payload - The payload to be included in the token.
 * @returns {string} The generated JWT.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

/**
 * Verifies a JSON Web Token.
 * @param {string} token - The token to verify.
 * @returns {object|null} The decoded payload if the token is valid, otherwise null.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
