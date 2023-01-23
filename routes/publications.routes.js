const express = require('express')
const router = express.Router()

// Middleware

const auth = require('../middlewares/auth.middleware')

const {     
  getPublications,
  addPublication,
  getPublication,
  // updatePublication,
  removePublication } = require('../controllers/publications.controller')

const {
  addVote,
  removeVote
} = require('../controllers/votes.controller')

router.get('/', getPublications)
router.post('/',auth, addPublication)
router.get('/:id',auth, getPublication)
// router.put('/:id', updatePublication)
router.delete('/:id', removePublication)


router.post('/:id/vote',addVote )
router.delete('/:id/vote',removeVote )

module.exports = router