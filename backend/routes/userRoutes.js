const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router.route('/userId')
    .get(authController.verify, userController.getUser)
    .delete(authController.verify, userController.deleteUser)
    .patch(authController.verify, userController.updateUser)

router.route('/userId/trips')
    .get(authController.verify, userController.getTripsByUser)

router.route('/userId/password')
    .post(authController.verify, userController.changePassword)

module.exports = router