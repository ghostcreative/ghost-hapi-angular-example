
const _ = require('lodash');
const Boom = require('boom');
const Moment = require('moment');
const serviceLocator = require('../../../../services/src/serviceLocatorFactory').getServiceLocatorSingleton();

const profileService = serviceLocator.getProfileService();
const userService = serviceLocator.getUserService();
const logger = serviceLocator.getLogger();

/**
 * @param {Jwt Object} decoded
 * @param {Hapi.Request} request
 * @param {Function} done
 */
const BearerJwtAuthValidateFunc = (request, decoded, done) => {

  if (!decoded.userId || !decoded.expires) {
    return done('Malformed authorization token, please sign in.');
  }

  if (decoded.expires <= Moment()) {
    return done('Authorization token has expired, please sign in.');
  }

  return userService.getById(decoded.userId)
  .then((user) => {
    return profileService.getById(user.profileId)
    .then((profile) => {
      const creds = _.clone(user);
      creds.profile = _.clone(profile);
      creds.scope = [user.role];
      done(null, true, creds);
    });

  })
  .catch(done);


};

module.exports = BearerJwtAuthValidateFunc;