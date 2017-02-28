
'use strict';

const NodeGlob = require('glob');
const Path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash');

class ServiceLocator {

  /**
   * @param {GhostServicesConfig} nodeConfig
   */
  constructor (nodeConfig) {
    this._nodeConfig = nodeConfig;
  }

  /**
   * @returns {Logger}
   */
  getLogger () {
    if (!this._logger) {
      const GhostLogger = require('ghost-logger');
      this._logger = new GhostLogger(this._nodeConfig.get('logger'));
    }
    return this._logger;
  }

  /**
   * @return {[Sequelize.Model]}
   */
  getModels () {
    if (!this._models) {
      const sequelize = this.getSequelizeDatabaseInstance();
      const modelPathGlob = Path.resolve(__dirname, this._nodeConfig.get('sequelize.modelDir'));
      const modelFiles = NodeGlob.sync(modelPathGlob);
      if (_.isEmpty(modelFiles)) throw new Error(`Invalid model dir glob provided, could not find any models in: ${modelPathGlob}`);

      const models = {};
      _.each(modelFiles, file => {
        const model = sequelize.import(file);
        models[model.name] = model;
      });
      this._models = models;
    }

    return this._models;
  }

  /**
   * @returns {Sequelize}
   */
  getSequelizeDatabaseInstance () {
    if (!this._sequelize) {
      this._sequelize = new Sequelize(
        this._nodeConfig.get('sequelize.database'),
        this._nodeConfig.get('sequelize.username'),
        this._nodeConfig.get('sequelize.password'),
        this._nodeConfig.get('sequelize.options')
      );
    }

    return this._sequelize;
  }

  /**
   * @returns {TodoListService}
   */
  getTodoListService () {
    if (!this._todoListService) {
      const TodoListServiceFactory = require('./todoList/todoListServiceFactory');
      this._todoListService = TodoListServiceFactory.create(this.getModels(), this.getLogger());
    }

    return this._todoListService;
  }
}

module.exports = ServiceLocator;