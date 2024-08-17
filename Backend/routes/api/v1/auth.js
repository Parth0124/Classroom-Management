const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authController');
const { authMiddleware } = require('../../../middlewares/middlewares');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user',authMiddleware, authController.getCurrentUser);


module.exports = router;

