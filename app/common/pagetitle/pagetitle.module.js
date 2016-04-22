
var angular = require('angular');
var service = require('./pagetitle.service');

module.exports = angular
    .module('pagetitle', [])
    .service('pageTitleService', service);
