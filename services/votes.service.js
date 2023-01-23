const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const {v4: uuid4} = require('uuid')



class VotesService {

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
    
    const votes = await models.Votes.findAndCountAll(options)
    return votes
  }

  async createVote({ publication_id,profile_id}) {
    const transaction = await models.sequelize.transaction()
    try {
      let newVote = await models.Votes.create({
        publication_id,
        profile_id
      }, { transaction })

      await transaction.commit()
      return newVote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getVoteOr404(id) {
    let vote = await models.Votes.findByPk(id)

    if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')

    return vote
  }
  
  // ver todo los votos del usuario
  
  // async getAllVotesUser(id){
  //   let votes = await models.Profiles.findByPk(id)
  //   if (!votes) throw new CustomError('Not found votes', 404, 'Not Found')

  //   return votes

  // }


  //Return not an Instance raw:true | we also can converted to Json instead
  async getVote(id) {
    let vote = await models.Votes.findByPk(id, { raw: true })
    return vote
  }



  async removeVote(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let vote = await models.Votes.findByPk(id)

      if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')

      await vote.destroy({ transaction })

      await transaction.commit()

      return vote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = VotesService