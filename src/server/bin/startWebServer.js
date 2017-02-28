
const BinSetupHelper = require('./misc/binSetupHelper');
BinSetupHelper.setupNodeConfigAndUncaughtExceptionHandlers();
const NodeConfig = require('config');
const serviceLocator = require('../../services/src/serviceLocatorFactory').getServiceLocatorSingleton(NodeConfig);

const logger = serviceLocator.getLogger();
const CustomServerFactory = require('../src/customServerFactory');

const Promise = require('bluebird');

logger.info('Attempting to create web server', {
  NODE_ENV: process.env.NODE_ENV,
  NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE
});

CustomServerFactory.createServerFromNodeConfig(NodeConfig)
.then((server) => {
  logger.info('Server created successfully');

  server.start((err) => {
    if (err) {
      logger.error('Server failed to start', err);
    } else {
      serviceLocator.registerShutdownTask(() => Promise.promisify(server.stop.bind(server))());
    }
  });

  ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) => {
    process.on(signal, () => {
      logger.info(`Recieved ${signal}.  Shutting down.`);
      serviceLocator.shutdown()
      .catch(err => logger.error('Error while shutting down.', err))
      .finally(() => {
        logger.info('Shutdown tasks complete. Exiting.');
        process.exit();
      });
    });
  });
})
.catch((err) => {
  logger.error('Failed creating server', err);
});