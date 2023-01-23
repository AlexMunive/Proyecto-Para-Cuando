const express = require('express')
const router = express.Router()

// solo get all

const {     
  getStates,
  addState,
  getState,
  updateState,
  removeState } = require('../controllers/states.controller')

router.get('/', getStates)
router.post('/', addState)
router.get('/:id', getState)
router.put('/:id', updateState)
router.delete('/:id', removeState)

module.exports = router