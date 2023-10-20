const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);


router.put('/update-profile', userController.authMiddleware, userController.updateProfile);


router.get('/users', userController.getAllUsers);


module.exports = router;
