module.exports = [{
    method: 'GET',
    '/css/{param*}',
    handler: {
        directory: { path: '/server/web/public/css' }
    }
}];