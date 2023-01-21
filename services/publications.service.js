const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const {v4: uuid4} = require('uuid')



class PublicationsService {

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
    
    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  async createPublication({ profile_id,publication_type_id,city_id,title,description,content,picture,image_url }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newPublications = await models.Publications.create({
        id: uuid4(),
        profile_id,
        publication_type_id,
        city_id,
        title,
        description,
        content,
        picture,
        image_url
      }, { transaction })

      await transaction.commit()
      return newPublications
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getPublicationOr404(id) {
    let publication = await models.Publications.findByPk(id)

    if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

    return publication
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublication(id) {
    let publication = await models.Publications.findByPk(id, { raw: true })
    return publication
  }

  async updatePublication(id, { name,description }) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found publicationType', 404, 'Not Found')

      let updatedPublication = await publication.update({
        name,description
      }, { transaction })

      await transaction.commit()

      return updatedPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removePublication(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

      await publication.destroy({ transaction })

      await transaction.commit()

      return publication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = PublicationsService