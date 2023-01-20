const { dbConnService } = require('./src/mongo')
dbConnService.dbConnect()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { PersonsApi } = require('./src/persons')
const { InfoApi } = require('./src/info')
const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))
PersonsApi(app)
InfoApi(app)
app.use((error, req, res, next) => {
  console.error(error)
  console.log(error.name)
  if (error.name === 'CastError') {
    res.status(404).send({ error: 'id used is malformed' }).end()
  } else {
    res.status(500).end()
  }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
