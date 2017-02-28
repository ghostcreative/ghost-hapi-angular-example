const NodeConfig = require('config');
const BearerJwtValidateFunc = require('./bearerJwtAuthValidateFunc');

const BearerJwtAuthPlugin = {

  register: (server, options, next) => {

    server.auth.strategy('bearerJwt', 'jwt', {
      key: NodeConfig.get('server.authSecretKey'),
      validateFunc: BearerJwtValidateFunc,
      verifyOptions: { algorithms: ['HS256'] },
      tokenType: 'Bearer'
    });

    next();

  }

};

BearerJwtAuthPlugin.register.attributes = {
  name: 'BearerJwtAuthPlugin'
};

module.exports = BearerJwtAuthPlugin;