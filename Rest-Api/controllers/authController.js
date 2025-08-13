

const { comparePassword } = require('../utils/auth');
const { generateToken } = require('../utils/jwt');
const User = require('../models/User');

const registerUser = async (req, res, next) => {
  const { username, password, email, branch_code } = req.body;
  try {
    
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    user = new User({ username, password, email, branch_code });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err); 
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
   
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    next(err); 
  }
};

module.exports = { registerUser, loginUser };
