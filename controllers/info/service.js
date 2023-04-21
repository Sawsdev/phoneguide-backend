const { PersonsService } = require('../../persons/service')
const showApiInfo = () => {
  const persons = PersonsService.getAllPersons()
  return `Phonebook has info for ${persons.length} persons
  ${new Date()}`
}

module.exports.InfoService = {
  showApiInfo
}
