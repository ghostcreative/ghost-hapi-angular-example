'use strict';

const _ = require('lodash');
const Boom = require('boom');
const GhostRouteController = require('ghost-hapi-controller');

class TodoListRouteController extends GhostRouteController {

  /**
   * @class TodoListRouteController
   *
   * @param {Sequelize.Model} service
   * @param {GhostLogger} logger
   */
  constructor (service, logger) {
    super(service, logger)
  }

  /**
   * @method TodoListRouteController.getByProfile
   *
   * @param {Hapi.Request} req
   * @param {Hapi.Response} reply
   */
  getByProfile (req, reply) {
    return this._service.model
    // .addScope('getByProfile', { where: { profileId: req.params.profileId } }, { override: true })
    .findAll()
    .then(docs => reply({ docs }))
    .catch((err) => {
      this._logger.error(err.message, { params: req.params, err });
      reply(err.isBoom ? err : Boom.badImplementation());
    });
  }

}

module.exports = TodoListRouteController;