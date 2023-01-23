const express = require('express')
const router = express.Router()

//* controllers

const AuthController = require('../controllers/auth.controller')

router.post('/sign-up', AuthController.signUp)

router.post('/login', AuthController.login)

module.exports = router
