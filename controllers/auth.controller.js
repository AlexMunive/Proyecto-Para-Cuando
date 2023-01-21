const { Users } = require('../database/models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../database/config/auth')

module.exports= {

  //* login
  login(req, res){
       
    let {email, password}= req.body

    //* buscamos un usuario

    Users.findOne({
      where: {
        email: email
      }
    }).then(user=>{

      if(!user){
        res.status(400).json({msg: 'user not found'})
      }else{
        if(bcrypt.compareSync(password, user.password)){

          //* si coinciden devolvemos token

          let token = jwt.sign({user:user}, authConfig.secret,{
            expiresIn: authConfig.expires
          })
          res.json({
            user: user,
            token: token
          })

        }else{

          //* Unautorized Access
          res.status(401).json({msg: 'Incorrect password'})
        }
      }
    })


  },

  //* registrarse
  signUp(req, res){
     
    //* encriptar contraseña
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
         
    //* crear un usuario
    Users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password:  password
    }).then(user =>{
      
      //* creamos el token
      let token = jwt.sign({user:user}, authConfig.secret,{
        expiresIn: authConfig.expires
      })

      res.json({
        user: user,
        token: token
      })
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

}