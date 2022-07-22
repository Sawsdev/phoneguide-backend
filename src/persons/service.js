let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  },
  {
    name: 'Ruben',
    number: '3646488',
    id: 5
  },
  {
    name: 'Analuisa',
    number: '3231164',
    id: 6
  }
]

const getAllPersons = () => {
  return persons
}

const getPerson = (id) => {
  if (!id) return false
  return persons.find((person) => person.id === id)
}

const deletePerson = (id) => {
  if (!id) return false
  const personIndex = persons.findIndex((person) => person.id === id)
  console.log(personIndex)
  if (personIndex < 0) return false
  const deletedPerson = persons.splice(personIndex, 1)
  return deletedPerson
}

const createPerson = (person) => {
  if (!person) return false
  const noUnique = persons.find((localPerson) => localPerson.name === person.name)
  if (noUnique) return false
  person.id = persons.length + 1
  persons = [...persons, person]
  return person
}

module.exports.PersonsService = {
  getAllPersons,
  getPerson,
  deletePerson,
  createPerson
}
