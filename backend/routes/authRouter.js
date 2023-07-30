const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login')
    .post(authController.login)

router.route('/verify')
    .post(authController.verify)

router.route('/logout')
    .get(authController.logout)

module.exports = router