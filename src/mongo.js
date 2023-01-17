require('dotenv').config()
const mongoose = require('mongoose')
const { Schema, model } = mongoose
const connectionString = process.env.MONGO_CONNECTION_STRING

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

/**
 * Schema para personas en la agenda
 */
const personSchema = Schema({
  name: String,
  number: String
})

const Person = model('Person', personSchema)

Person.find({}).then(result => {
  console.log(result)
  mongoose.connection.close()
})
// const person = new Person({
//   name: 'Dark the crusher',
//   number: '+(52)999-632145'
// })

// person.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.log(err)
//   })
