const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const {v4: uuid4} = require('uuid')



class CountriesService {

  constructor(){

  }

  async findAndCount(query) {
    const options = {
      where: {},
    }
        
    const { limit, offset } = query
    if (limit && offset) {
      options.limit =  limit
      options.offset =  offset
    }
        
    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true
    
    const countries = await models.Countries.findAndCountAll(options)
    return countries
  }

  async createCountrie({name}) {
    const transaction = await models.sequelize.transaction()
    try {
      let newCountrie = await models.Countries.create({
        id: uuid4(),
        name
      }, { transaction })

      await transaction.commit()
      return newCountrie
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getCountrieOr404(id) {
    let countrie = await models.Countries.findByPk(id)

    if (!countrie) throw new CustomError('Not found Countrie', 404, 'Not Found')

    return countrie
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getCountrie(id) {
    let countrie = await models.Countries.findByPk(id, { raw: true })
    return countrie
  }

  async updateCountrie(id, { name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let countrie = await models.Countries.findByPk(id)

      if (!countrie) throw new CustomError('Not found countrie', 404, 'Not Found')

      let updatedCountrie = await countrie.update({
        name
      }, { transaction })

      await transaction.commit()

      return updatedCountrie
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeCountrie(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let countrie = await models.Countries.findByPk(id)

      if (!countrie) throw new CustomError('Not found countrie', 404, 'Not Found')

      await countrie.destroy({ transaction })

      await transaction.commit()

      return countrie
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = CountriesService