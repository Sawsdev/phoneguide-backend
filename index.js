const { dbConnService } = require('./src/mongo')
dbConnService.dbConnect()
const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const morgan = require('morgan')
const cors = require('cors')
const { PersonsApi } = require('./src/persons')
const { InfoApi } = require('./src/info')
const errorMiddleware = require('./src/middlewares/errorHandler')
const notFound = require('./src/middlewares/notFound')
const app = express()
app.use(express.json())
app.use(cors())

Sentry.init({
  dsn: 'https://571fb18215ed41c29ed373cf51b393ac@o4504560793092096.ingest.sentry.io/4504560820092928',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

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
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())
/**
 * Controllers
 */
PersonsApi(app)
InfoApi(app)
app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use(errorMiddleware)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
