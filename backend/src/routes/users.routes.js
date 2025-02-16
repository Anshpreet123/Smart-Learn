const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.post('/logout', usersController.logoutUser);
router.post('/refresh', usersController.refreshAccessToken);
router.get('/profile', authMiddleware, usersController.getUserProfile);
router.put('/profile-update', authMiddleware, usersController.updateProfile);

module.exports = router;
