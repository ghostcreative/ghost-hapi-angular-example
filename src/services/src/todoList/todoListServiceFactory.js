'use strict';

const TodoListService = require('./todoListService');

class TodoListServiceFactory {

  /**
   * @param {[Sequelize.Model]} models
   * @param {Logger} logger
   * @returns {TodoListService}
   */
  static create(models, logger) {
    const TodoListModel = models['todoList'];
    if ('associate' in TodoListModel) TodoListModel.associate(models);
    return new TodoListService(TodoListModel, logger);
  }

}

module.exports = TodoListServiceFactory;