
var angular = require('angular');
var storage = require('ngstorage');
var service = require('./language.service');
var directive = require('./language.directive');

module.exports = angular
    .module('language', [storage.name])
    .service('languageService', service)
    .directive('localText', directive);
