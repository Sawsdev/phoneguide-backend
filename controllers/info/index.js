const express = require('express')
const { InfoController } = require('./controller')

const router = express.Router()

module.exports.InfoApi = (app) => {
  router.get('/', InfoController.getApiInfo)

  app.use('/info', router)
}
