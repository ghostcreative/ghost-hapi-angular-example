const {
    HTTP_PROVIDERS,
    SERVER_LOCATION_PROVIDERS,
    REQUEST_URL,
    PRIME_CACHE,
    queryParamsToBoolean
} = require('angular2-universal');

const {provide} = require('angular2/core');
const {ROUTER_PROVIDERS, APP_BASE_HREF} = require('angular2/router');

const { AppComponent } = require('../app/components/app/app');
const _ = require('lodash');

// TODO - break this up in to individual files and load via Glob regex
module.exports = [{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        const queryParams = queryParamsToBoolean(request.query);
        const options = _.assign(queryParams, {
            // client url for systemjs
            componentUrl: '/app',

            App: AppComponent,
            providers: [
                // HTTP_PROVIDERS,
                // SERVER_LOCATION_PROVIDERS,
                // provide(BASE_URL, {useExisting: req.originalUrl}),
                // provide(PRIME_CACHE, {useExisting: true})
            ],
            data: {},

            preboot: queryParams.preboot === false ? null : {
                start: true,
                appRoot: 'app',         // selector for root element
                freeze: 'spinner',     // show spinner w button click & freeze page
                replay: 'rerender',    // rerender replay strategy
                buffer: true,          // client app will write to hidden div until bootstrap complete
                debug: false,
                uglify: true,
                presets: ['keyPress', 'buttonPress', 'focus']
            }

        });

        reply.view('app/index', options);
    }
}, {
    method: 'GET',
    path: '/todo-lists',
    handler: (request, reply) => {
        // TODO - load todoListApp
    }
}];