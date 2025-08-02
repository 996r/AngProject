// utils/auth.js

const bcrypt = require('bcryptjs');

/**
 * Hashes a plaintext password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares a plaintext password with a hashed password.
 * @param {string} password - The plaintext password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} True if the passwords match, false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
