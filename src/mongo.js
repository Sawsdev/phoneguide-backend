require('dotenv').config()
const mongoose = require('mongoose')
const connectionString = process.env.MONGO_CONNECTION_STRING

const dbConnect = () => {
  mongoose.connect(connectionString)
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports.dbConnService = {
  dbConnect
}
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
