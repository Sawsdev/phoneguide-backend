const { PersonsService } = require('./service')
const mongoose = require('mongoose')
const Person = require('../models/Person')
module.exports.PersonsController = {
  getPersons: (req, res, next) => {
    Person.find({})
      .then(result => {
        mongoose.connection.close()
        res.status(200).send(result).end()
      })
      .catch(err => {
        next(err)
      })
    // res.status(200).send(PersonsService.getAllPersons()).end()
  },
  getPerson: (req, res, next) => {
    const {
      params: { id }
    } = req
    Person.findById(id)
      .then(person => {
        !person
          ? res.status(404).send('Person not found').end()
          : res.status(200).json(person).end()
      })
      .catch(err => next(err))
    // PersonsService.getPerson(Number(id))
  },
  deletePerson: (req, res, next) => {
    const {
      params: { id }
    } = req
    if (!id) {
      res.status(400).send('Bad Request').end()
    }

    Person.findByIdAndRemove(id)
      .then(person => {
        mongoose.connection.close()
        !person
          ? res.status(404).send('Person not found').end()
          : res.status(204).send(person).end()
      })
      .catch(error => next(error))
    // const deletedPerson = PersonsService.deletePerson(Number(id))
    // !deletedPerson
    //   ? res.status(404).send('Person not found').end()
    //   : res.status(200).send(deletedPerson).end()
  },
  createPerson: (req, res, next) => {
    const {
      body
    } = req
    if (!body.name || !body.number) {
      return res.status(400).send({ error: 'No data provided' }).end()
    }
    const newPerson = new Person({
      name: body.name,
      number: body.number
    })
    newPerson.save().then(person => {
      console.log('Person saved')
      console.log(person)
      mongoose.connection.close()
      res.status(201).send({ success: 'Created new phoneguide entry!' }).end()
    })
      .catch(err => next(err))
    // const alreadyExist = PersonsService.createPerson(newPerson)
    // console.log(alreadyExist)
    // !alreadyExist
    //   ? res.status(409).send({ error: 'names must be unique' }).end()
    //   : res.status(200).send(alreadyExist).end()
  },
  updatePerson: (req, res, next) => {
    const {
      params: { id },
      body
    } = req
    if (!body.name || !body.number) {
      return res.status(400).send({ error: 'No data provided' }).end()
    }
    const newPerson = {
      name: body.name,
      number: body.number
    }
    Person.findByIdAndUpdate(id, newPerson, { new: true }, { runValidators: true }).then(person => {
      console.log('Person saved')
      console.log(person)
      mongoose.connection.close()
      res.json(person).end()
    })
      .catch(err => next(err))
  }
}
