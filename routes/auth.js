const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const isAuth = require('../middleware/isAuth')

router.get('/sign-up', authController.getSignUp)

router.post('/sign-up', authController.postSignUp)

router.get('/logout', isAuth, authController.getLogout)

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

module.exports = router
