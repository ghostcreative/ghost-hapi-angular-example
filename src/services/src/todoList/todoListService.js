'use strict';

/**
 * @class TodoListService
 */
class TodoListService {

  /**
   * @param {Sequelize.Model} model
   * @param {Logger} logger
   */
  constructor (model, logger) {
    this._model = model;
    this._logger = logger;
  }

  /**
   * @param {Number} id
   * @param {Object} [options]
   * @returns {Promise.<todoList>}
   */
  findById (id, options) {
    return this._model.findById(id, options)
    .catch(err => {
      this._logger.error('TodoListService.findById Error', err);
      throw new Error('TodoListService.findById failed');
    })
  }

  /**
   * @param {Object} [options]
   * @returns {Promise.<todoList>}
   */
  findOne (options) {
    return this._model.findOne(options)
    .catch(err => {
      this._logger.error('TodoListService.findOne Error', err);
      throw new Error('TodoListService.findOne failed');
    })
  }

  /**
   * @param {todoList} data
   * @returns {Promise.<todoList>}
   */
  create (data) {
    return this._model.create(data)
    .catch(err => {
      this._logger.error('TodoListService.create Error', err);
      throw new Error('TodoListService.create failed');
    })
  }

}

module.exports = TodoListService;