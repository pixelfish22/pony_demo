var angular = require('angular');

module.exports = angular.module('user', [])
    .service('userService', require('./user.service'));
