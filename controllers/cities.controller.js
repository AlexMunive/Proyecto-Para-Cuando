const CitiesService = require('../services/cities.service')
const {getPagination, getPagingData} = require('../utils/sequelize-utils')

const citiesService = new CitiesService()

const getCities = async(request, response, next) => {
  try {
    let query = request.query
    let {page, size} = query
        
    const {limit, offset} = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let cities = await citiesService.findAndCount(query)
    const results = getPagingData(cities,page,limit)
    return response.json({results: results})
        
  } catch (error) {
    next(error)
  }
}

const addCitie = async(request, response, next) => {
  try {
    let { body } = request
    let citie = await citiesService.createCitie(body)
    return response.status(201).json({results: citie})
  } catch (error) {
    next(error)
  }
}

const getCitie = async(request, response, next) => {
  try {
    let { id } = request.params
    let cities = await citiesService.getCitieOr404(id)
    return response.json({results: cities})
  } catch (error) {
    next(error)
  }
}

const updateCitie = async(request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let citie = await citiesService.updateCitie(id,body)
    return response.json({results: citie})
  } catch (error) {
    next(error)
  }
}

const removeCitie = async(request, response, next) => {
  try {
    let { id } = request.params
    let citie = await citiesService.removeCitie(id)
    return response.json({results: citie, message: 'removed'})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCities,
  addCitie,
  getCitie,
  updateCitie,
  removeCitie
}