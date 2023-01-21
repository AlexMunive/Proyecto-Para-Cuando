const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const {v4: uuid4} = require('uuid')



class CitiesService {

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
    
    const cities = await models.Cities.findAndCountAll(options)
    return cities
  }

  async createCitie({state_id,name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newCitie = await models.Cities.create({
        id: uuid4(),
        state_id,
        name
      }, { transaction })

      await transaction.commit()
      return newCitie
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getCitieOr404(id) {
    let citie = await models.Cities.findByPk(id)

    if (!citie) throw new CustomError('Not found citie', 404, 'Not Found')

    return citie
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getCitie(id) {
    let citie = await models.Cities.findByPk(id, { raw: true })
    return citie
  }

  async updateCitie(id, { name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let citie = await models.Cities.findByPk(id)

      if (!citie) throw new CustomError('Not found citie', 404, 'Not Found')

      let updatedCitie = await citie.update({
        name
      }, { transaction })

      await transaction.commit()

      return updatedCitie
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeCitie(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let citie = await models.Cities.findByPk(id)

      if (!citie) throw new CustomError('Not found citie', 404, 'Not Found')

      await citie.destroy({ transaction })

      await transaction.commit()

      return citie
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = CitiesService