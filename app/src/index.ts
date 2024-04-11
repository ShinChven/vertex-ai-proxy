// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { createApp } from './app'
import { logger } from './logger'

createApp().then((app) => {
  const port = app.get('port')
  const host = app.get('host')

  process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

  app.listen(port).then(() => {
    logger.info(`Feathers app listening on http://${host}:${port}`)
  })
});




