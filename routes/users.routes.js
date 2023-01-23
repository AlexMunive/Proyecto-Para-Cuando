const express = require('express')
const router = express.Router()
const passport = require('passport')

// Middleware

const auth = require('../middlewares/auth.middleware')

const {     
  getUsers,
  // addUser,
  getUser,
  updateUser,
  removeUser } = require('../controllers/users.controller')

const {
  getVotes,
  getVote,
  getAllVotesUser
}= require('../controllers/votes.controller')

router.get('/', getUsers)
// router.post('/', addUser)
router.get('/:id',auth, getUser)
// router.get('/me', auth, getUser)
router.put('/:id',auth, updateUser)
router.delete('/:id',auth, removeUser)


router.get('/:id/votes', getVotes)

module.exports = router