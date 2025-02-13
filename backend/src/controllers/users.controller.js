const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../common/token');
const User = require('../models/users.model.js');
const dotenv = require('dotenv');
const codes = require('../common/httpCodes');
const messages = require('../common/messages');
dotenv.config();

// Register User
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('userExists already');
      return res.status(codes.BAD_REQUEST).json({ message: messages.userExists });
    }

    const user = new User({ firstName, lastName, email, password, userType });
    // pre will hash the password
    await user.save();

    res.status(codes.CREATED).json({ message: messages.userRegistered });
    console.log('User registered successfully');
  } catch (error) {
    res.status(codes.SERVER_ERROR).json({ message: error.message });
    console.log('Error registering user');
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      console.log("Either user doesn't exist or password is incorrect");
      return res.status(400).json({ message: messages.invalidCredentials });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
    console.log('User logged in successfully');

    res
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' })
      .json({ accessToken });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    console.log('Error logging in user');
  }
};

// Refresh Token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(403).json({ message: 'No refresh token provided' });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });

      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    // need to destructre the token from the cookie
    if (!refreshToken) return res.status(403).json({ message: 'No refresh token provided' });

    await User.findOneAndUpdate({ refreshToken }, { refreshToken: '' });

    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
    console.log('User logged out successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error logging out user');
  }
};

// for profile , it will check the middleware route

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    console.log('User profile fetched successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error fetching user profile');
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
};
