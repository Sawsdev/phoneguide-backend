const { Schema, model } = require('mongoose')

/**
 * Schema para personas en la agenda
 */
const personSchema = Schema({
  name: { type: String, unique: true, minLength: 3 },
  number: {
    type: String,
    min: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}/gi.test(v)
      },
      message: props => `${props.value} is not a valid number`
    },
    required: [true, 'Person phone number is required']
  }
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
