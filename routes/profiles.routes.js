const express = require('express')
const router = express.Router()

// Middleware

const auth = require('../middlewares/auth.middleware')

const {     
  getProfiles,
  addProfile,
  getProfile,
  updateProfile,
  removeProfile } = require('../controllers/profiles.controller')

router.get('/', getProfiles)
router.post('/', auth,addProfile)
router.get('/:id',auth, getProfile)
router.put('/:id',auth, updateProfile)
router.delete('/:id',auth, removeProfile)

module.exports = router