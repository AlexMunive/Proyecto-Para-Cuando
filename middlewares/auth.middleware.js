const jwt = require('jsonwebtoken')
const authConfig = require('../database/config/auth')

const { Users } = require('../database/models/index')

module.exports= (req, res, next) =>{

 

  // Comprobar que existe el token

  if(!req.headers.authorization){
    res.status(401).json({msg: 'Acceso no autorizado'})
  }else{

    // comprobar la validez de este token

    let token = req.headers.authorization.split(' ')[1]

    // comprobar la validez de este token

    jwt.verify(token, authConfig.secret, (err, decoded)=>{

      if(err){
        res.status(500).json({msg: 'ha ocurrido un problema al decodificar el token', err})
      }else{

        // Users.findByPk(decoded.user.id).then(user =>{

        //   req.user = user
        //   next()
        // })




        req.user = decoded
        next()
      }
    })


   
  }


 
}