'use strict';

const Config = require('config');
const ServiceLocator = require('./serviceLocator');
const path = require('path');

let serviceLocator = null;

const ServiceLocatorFactory = {

  /**
   * @name GhostServicesConfig
   * @type {Config}
   * @property {GhostServices_LoggerConfig} logger
   * @property {GhostServices_SequelizeConfig} sequelize
   */

  /**
   * @name GhostServices_LoggerConfig
   * @type {Object}
   * @property {Boolean} enabled
   * @property {Object} console
   * @property {Boolean} console.enabled
   * @property {String} console.level
   * @property {Boolean} console.colorize
   * @property {Object} loggly
   * @property {Boolean} loggly.enabled
   * @property {String} loggly.level
   * @property {String} loggly.token
   * @property {String} loggly.subdomain
   * @property {[String]} loggly-.tags
   */

  /**
   * @name GhostServices_SequelizeConfig
   * @type {Object}
   * @property {String} database
   * @property {String} username
   * @property {String} password
   * @property {String} modelsDir
   * @property {GhostServices_SequelizeConfigOptions} options
   */

  /**
   * @name GhostServices_SequelizeConfigOptions
   * @property {String} host
   * @property {'mysql'|'postgres'|'sqlite'|'mssql'} dialect
   * @property {Object} dialectOptions
   * @property {String} timezone
   * @property {Boolean} logging
   * @property {Boolean} benchmark
   * @property {Object} sync
   * @property {Object} pool
   */

  /**
   * @param {GhostServicesConfig|Config} [nodeConfig]
   * @returns {ServiceLocator}
   */
  getServiceLocatorSingleton: (nodeConfig) => {
    if (!serviceLocator) {
      if (!nodeConfig) {
        nodeConfig = Config;
      }
      serviceLocator = new ServiceLocator(nodeConfig);
    }
    return serviceLocator;
  }

};

module.exports = ServiceLocatorFactory;