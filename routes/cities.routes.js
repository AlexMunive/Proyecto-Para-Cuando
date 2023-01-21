const express = require('express')
const router = express.Router()

const {     
  getCities,
  addCitie,
  getCitie,
  updateCitie,
  removeCitie} = require('../controllers/cities.controller')

router.get('/', getCities)
router.post('/', addCitie)
router.get('/:id', getCitie)
router.put('/:id', updateCitie)
router.delete('/:id', removeCitie)

module.exports = router