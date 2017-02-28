const Path = require('path');

class BinSetupHelper {

  static setupNodeConfig() {
    process.env.NODE_CONFIG_DIR = Path.resolve(__dirname, '../../../config');
  }

  static setupNodeConfigAndUncaughtExceptionHandlers() {
    BinSetupHelper.setupNodeConfig();

    const NodeConfig = require('config');
    const serviceLocatorFactory = require('../../../services/src/serviceLocatorFactory').getServiceLocatorSingleton(NodeConfig);
    const logger = serviceLocatorFactory.getLogger();

    /**
     * We do this to make sure these errors aren't swallowed up
     * See http://jamesknelson.com/are-es6-promises-swallowing-your-errors/
     * More documentation in Bluebird docs: http://bluebirdjs.com/docs/api/promise.onpossiblyunhandledrejection.html
     *                                    : http://bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
     */
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Promise.onPossiblyUnhandledRejection', reason);
      // throw reason;
    });

    process.on('uncaughtException', (err) => {
      logger.error(err);
      // throw err;
    });
  }

}

module.exports = BinSetupHelper;