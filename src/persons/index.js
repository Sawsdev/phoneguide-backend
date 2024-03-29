const express = require('express')
const { PersonsController } = require('./controller')

const router = express.Router()

module.exports.PersonsApi = (app) => {
  router.get('/', PersonsController.getPersons)
    .get('/:id', PersonsController.getPerson)
    .delete('/:id', PersonsController.deletePerson)
    .post('/', PersonsController.createPerson)
    .put('/:id', PersonsController.updatePerson)
  app.use('/persons', router)
}
