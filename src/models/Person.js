const { Schema, model } = require('mongoose')

/**
 * Schema para personas en la agenda
 */
const personSchema = Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = model('Person', personSchema)

// Person.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

module.exports = Person
