var strFormat = require('../../utils/stringFormat');

module.exports = LocalTextDirective;

LocalTextDirective.$inject = ['languageService'];

function LocalTextDirective(languageService) {
    return {
        scope: {
            localText: '@',
            localParams: '='
        },
        restrict: 'A',
        template: '<span ng-bind="text"></span>',
        link: function ($scope) {

            var key = $scope.localText;
            var params = $scope.localParams;

            $scope.$watch(function(){

                return languageService.text[key];

            }, function(val){
                if (val) {
                    $scope.text = strFormat(val, params);
                }
            });
        }
    };
}
