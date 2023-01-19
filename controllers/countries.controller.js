const CountriesService = require('../services/countries.service')
const {getPagination, getPagingData} = require('../utils/sequelize-utils')

const countriesService = new CountriesService()

const getCountries = async(request, response, next) => {
  try {
    let query = request.query
    let {page, size} = query
        
    const {limit, offset} = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let countries = await countriesService.findAndCount(query)
    const results = getPagingData(countries,page,limit)
    return response.json({results: results})
        
  } catch (error) {
    next(error)
  }
}

const addCountrie = async(request, response, next) => {
  try {
    let { body } = request
    let countrie = await countriesService.createCountrie(body)
    return response.status(201).json({results: countrie})
  } catch (error) {
    next(error)
  }
}

const getCountrie = async(request, response, next) => {
  try {
    let { id } = request.params
    let countries = await countriesService.getCountrieOr404(id)
    return response.json({results: countries})
  } catch (error) {
    next(error)
  }
}

const updateCountrie = async(request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let countrie = await countriesService.updateCountrie(id,body)
    return response.json({results: countrie})
  } catch (error) {
    next(error)
  }
}

const removeCountrie = async(request, response, next) => {
  try {
    let { id } = request.params
    let countrie = await countriesService.removeCountrie(id)
    return response.json({results: countrie, message: 'removed'})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCountries,
  addCountrie,
  getCountrie,
  updateCountrie,
  removeCountrie
}