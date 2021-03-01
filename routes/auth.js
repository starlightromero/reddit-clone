const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin')

router.get('/sign-up', adminController.getSignUp)

router.post('/sign-up', adminController.postSignUp)

router.get('/lgout', adminController.getLogout)
