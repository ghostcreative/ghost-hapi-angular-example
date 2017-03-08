'use strict';

const ServerFactory = require('ghost-hapi-server');
const corsHeaders = require('hapi-cors-headers');
const InjectThen = require('inject-then');
const Promise = require('bluebird');
const Url = require('url');
const Path = require('path');
const { HapiEngine } = require('angular2-hapi-engine');
const Vision = require('vision');
const Inert = require('inert');

const HapiAuthJwt = require('hapi-auth-jwt');
const BearerJwtAuthPlugin = require('./plugins/bearerJwt/bearerJwtPlugin');

const beforeRoutingPlugins = [HapiAuthJwt, BearerJwtAuthPlugin, Vision, Inert];
const HapiForward = require('hapi-forward');

class CustomServerFactory {

    /**
     * @param {Config} nodeConfig
     * @returns {Promise.<Hapi.Server>}
     */
    static createServerFromNodeConfig (nodeConfig) {

        return new Promise((resolve, reject) => {
            ServerFactory.createServerFromNodeConfig(nodeConfig, require.main.filename, beforeRoutingPlugins, (err, server) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(server);
                }
            });

        })
        .then((server) => {
            // Adding cross-site origin headers on all requests to enable data logging / bandit JS to work appropriately
            server.ext('onPreResponse', corsHeaders);
            return server;
        })
        .then((server) => {
            // Add a plugin that ensures server.info.remoteAddress is the client IP address even if server is behind proxy (e.g., using Load Balancer on AWS)
            return new Promise((resolve, reject) => {
                server.register(HapiForward, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(server);
                    }
                });
            });

        })
        .then((server) => {
            // injectThen plugin provides promised server.injectThen method in tests
            return new Promise((resolve, reject) => {
                return server.register(InjectThen, (err) => {
                    return err ? reject(err) : resolve(server);
                });

            });
        })

        .then((server) => {
            // add angular server side rendering support
            server.views({
                engines: {
                    'html': {
                        module: new HapiEngine(),
                        compileMode: 'async'
                    },
                    relativeTo: __dirname,
                    path: Path.join(require.main.filename, 'server') // check this is the valid path
                }
            });

            return server;
        })

        .then((server) => {
            // Define the VAI network cookie owned by vizual.ai
            server.state('__ghostNetworkId', {
                ttl: 24 * 60 * 60 * 1000 * 365, // 365 days
                encoding: 'none',
                isSecure: false,
                isHttpOnly: false,
                clearInvalid: false, // remove invalid cookies
                strictHeader: false, // don't allow violations of RFC 6265
                domain: Url.parse(nodeConfig.get('web.baseUrl')).hostname,
                path: '/'
            });

            return server;
        });

    }

}

module.exports = CustomServerFactory;