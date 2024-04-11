// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import configuration from '@feathersjs/configuration'
import express, {
  cors,
  errorHandler,
  json,
  notFound,
  rest,
  serveStatic,
  urlencoded
} from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'

import type { Application } from './declarations'

import { logError } from './hooks/log-error'
import { logger } from './logger'
import { setupVertexProxy } from './vertex'

const app: Application = express(feathers())

export async function createApp() {
  app.configure(configuration())
  app.use(cors())
  app.use(json({ limit: '1024mb' }))
  app.use(urlencoded({ extended: true, limit: '1024mb' }))

  app.use('/', serveStatic(app.get('public')))

  app.configure(rest())
  app.configure(
    socketio({
      cors: {
        origin: app.get('origins')
      }
    })
  )

  app.configure(setupVertexProxy);

  app.use(notFound())
  app.use(errorHandler({ logger }))

  app.hooks({
    around: {
      all: [logError]
    },
    before: {},
    after: {},
    error: {}
  })
  app.hooks({
    setup: [],
    teardown: []
  })
  return app;
}






