const express = require('express')
const routesUsers = require('./users.routes')
const routesRoles = require('./roles.routes')
const routesCountries = require('./countries.routes')
const routesStates = require('./states.routes')
const routesAuth = require('./auth.routes')

const routesProfiles = require('./profiles.routes')
const routesCities = require('./cities.routes')
const routesPublicationsTypes = require('./publications_types.routes')
const routesPublications = require('./publications.routes')

function routerModels(app) {

 

  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', routesAuth)
  router.use('/users', routesUsers)
  router.use('/roles', routesRoles)
  router.use('/countries', routesCountries)
  router.use('/states', routesStates)
  router.use('/profiles', routesProfiles)
  router.use('/cities', routesCities)
  router.use('/publications-types', routesPublicationsTypes)
  router.use('/publications', routesPublications)
  
}

module.exports = routerModels