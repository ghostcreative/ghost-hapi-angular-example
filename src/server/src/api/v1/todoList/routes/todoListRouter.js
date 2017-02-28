'use strict';

const Joi = require('joi');
const ControllerFactory = require('../controllers/todoListControllerFactory');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/todo-lists/{id}',
    auth: {
      plugin: 'bearerJwt',
      validate: {
        params: { id: Joi.number().integer() }
      }
    },
    handler: ControllerFactory.get,
  },
  {
    method: 'POST',
    path: '/api/v1/todo-lists',
    auth: {
      plugin: 'bearerJwt',
      validate: {
        payload: Joi.object().keys({
          title: Joi.string().required()
        })
      }
    },
    handler: ControllerFactory.create,
  },
  {
    method: 'PUT',
    path: '/api/v1/todo-lists/{id}',
    auth: {
      plugin: 'bearerJwt',
      validate: {
        params: { id: Joi.number().integer().required() },
        payload: Joi.object().keys({
          doc: Joi.object().keys({
            id: Joi.number().integer().required().valid(Joi.ref('$params.id')),
            title: Joi.string().required(),
            createdAt: Joi.date().required(),
            updatedAt: Joi.date().required()
          })
        })
      }
    },
    handler: ControllerFactory.update,
  },
  {
    method: 'DELETE',
    path: '/api/v1/todo-lists/{id}',
    auth: {
      plugin: 'bearerJwt',
      validate: {
        params: { id: Joi.number().integer().required() }
      }
    },
    handler: ControllerFactory.delete,

  }
];