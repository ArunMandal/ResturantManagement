const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, phoneNumber, fullName, password, address } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(email, phoneNumber, fullName, hashedPassword, address);
    await user.save();
		console.log(user);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '6h',
    });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Authentication middleware
exports.authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, error: "Please provide Authorization" });
  }

  const arr = req.headers.authorization.split(" ");

  if (arr.length !== 2 || arr[0] !== "Bearer") {
    return res.status(401).json({ success: false, error: "Please use Bearer scheme" });
  }

  try {
    const decoded = jwt.verify(arr[1], JWT_SECRET);
    if (decoded) {
      // If the token is valid, set the decoded user information in req
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { phoneNumber, fullName, password, address } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (fullName) user.fullName = fullName;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (address) user.address = address;

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Add this function to userController.js
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    // Return the list of users in the response
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

