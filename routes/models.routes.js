const express = require('express')
const routesUsers = require('./users.routes')
const routesRoles = require('./roles.routes')
const routesCountries = require('./countries.routes')
const routesStates = require('./states.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', routesUsers)
  router.use('/roles', routesRoles)
  router.use('/countries', routesCountries)
  router.use('/states', routesStates)
  
}

module.exports = routerModels