'use strict';

const TodoListRouteController = require('./todoListRouteController');
const ServiceLocator = require('../../../../../../services/src/serviceLocatorFactory').getServiceLocatorSingleton();
const TodoListService = ServiceLocator.getTodoListService();
const Logger = ServiceLocator.getLogger();

class TodoListRouteControllerFactory {

  /**
   * @param {Hapi.Request} req
   * @param {Hapi.Response} reply
   * @returns {TodoListRouteController}
   */
  static get(req, reply) {
    // TODO - resolve scope
    return new TodoListRouteController(TodoListService, Logger).get(req, reply);
  }

  /**
   * @param {Hapi.Request} req
   * @param {Hapi.Response} reply
   * @returns {TodoListRouteController}
   */
  static fetch(req, reply) {
    // TODO - resolve scope
    return new TodoListRouteController(TodoListService, Logger).fetch(req, reply);
  }

  /**
   * @param {Hapi.Request} req
   * @param {Hapi.Response} reply
   * @returns {TodoListRouteController}
   */
  static create(req, reply) {
    return new TodoListRouteController(TodoListService, Logger).create(req, reply);
  }

  /**
   * @param {Hapi.Request} req
   * @param {Hapi.Response} reply
   * @returns {TodoListRouteController}
   */
  static update(req, reply) {
    // TODO - resolve scope
    return new TodoListRouteController(TodoListService, Logger).update(req, reply);
  }

  /**
   * @param {Hapi.Request} req
   * @param {Hapi.Response} reply
   * @returns {TodoListRouteController}
   */
  static delete(req, reply) {
    // TODO - resolve scope
    return new TodoListRouteController(TodoListService, Logger).delete(req, reply);
  }
}

module.exports = TodoListRouteControllerFactory;