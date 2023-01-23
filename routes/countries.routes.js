const express = require('express')
const router = express.Router()

// solo get all

const {     
  getCountries,
  addCountrie,
  getCountrie,
  updateCountrie,
  removeCountrie } = require('../controllers/countries.controller')

router.get('/', getCountries)
router.post('/', addCountrie)
router.get('/:id', getCountrie)
router.put('/:id', updateCountrie)
router.delete('/:id', removeCountrie)

module.exports = router