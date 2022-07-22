const { PersonsService } = require('./service')

module.exports.PersonsController = {
  getPersons: (req, res) => {
    res.status(200).send(PersonsService.getAllPersons()).end()
  },
  getPerson: (req, res) => {
    const {
      params: { id }
    } = req
    const person = PersonsService.getPerson(Number(id))
    !person
      ? res.status(404).send('Person not found').end()
      : res.status(200).json(person).end()
  },
  deletePerson: (req, res) => {
    const {
      params: { id }
    } = req
    if (!id) {
      res.status(400).send('Bad Request').end()
    }
    const deletedPerson = PersonsService.deletePerson(Number(id))
    !deletedPerson
      ? res.status(404).send('Person not found').end()
      : res.status(200).send(deletedPerson).end()
  },
  createPerson: (req, res) => {
    const {
      body
    } = req
    if (!body.name || !body.number) {
      return res.status(400).send({ error: 'No data provided' }).end()
    }
    const newPerson = {
      name: body.name,
      number: body.number
    }
    const alreadyExist = PersonsService.createPerson(newPerson)
    console.log(alreadyExist)
    !alreadyExist
      ? res.status(409).send({ error: 'names must be unique' }).end()
      : res.status(200).send(alreadyExist).end()
  }
}
