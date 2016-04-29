/*jshint -W079 */

require('../style/css/app.min.css!css');
require('../style/css/vendor.min.css!css');

var angular = require('angular');
var webuiCore = require('webui-core');
var webuiFeedback = require('webui-feedback');

var setup = require('./setup');
var routes = require('./routes');
var constants = require('./constants');
var controller = require('./controller');
var errors = require('./utils/errors');

var userModule = require('./common/user/user.module');
var titleModule = require('./common/pagetitle/pagetitle.module');
var langModule = require('./common/language/language.module');
var PonyService = require('./services/ponies/pony.module').default;

console.log('pony service', PonyService);

var appDeps = [
    'ui.router',
    webuiCore.name,
    webuiFeedback.name,
    titleModule.name,
    langModule.name,
    userModule.name,
    PonyService.name
];

module.exports = angular.module('myApp', appDeps)
    .constant('constants', constants)
    .factory('$exceptionHandler', errors)
    //.service('ponyService', PonyService)
    .controller('AppController', controller)
    .config(routes)
    .run(setup);
