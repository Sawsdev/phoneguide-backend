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

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
module.exports.dbConnService = {
  dbConnect
}
