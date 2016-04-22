
module.exports = Routes;

Routes.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider'
];

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state(require('./routes/index.route'))
        .state(require('./routes/error/error.route'))
        .state(require('./routes/error/404/404.route'))
        .state(require('./routes/dashboard/dashboard.route'))
        .state(require('./routes/users/users.route'))
        .state(require('./routes/users/list/users.list.route'))
        .state(require('./routes/users/edit/users.edit.route'))
        .state(require('./routes/users/detail/users.detail.route'))
        .state(require('./routes/ponies/ponies.route'))
        .state(require('./routes/ponies/list/ponies.list.route'));

    $urlRouterProvider.otherwise(function ($injector) {
        $injector.get('$state').go('error.404');
    });
}
