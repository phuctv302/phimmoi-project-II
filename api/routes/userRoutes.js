const express = require('express')

const authController = require('../controller/authController')
const userController = require('../controller/userController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login);
router.post('/logout', authController.logout)

router.get('/me', authController.protect, userController.getMe, userController.getUser);

router.route('/').get(userController.getAllUsers)
router.route('/:id').get(userController.getUser)

module.exports = router;
