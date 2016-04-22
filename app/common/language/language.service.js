var angular = require('angular');

module.exports = LanguageService;

LanguageService.$inject = [
    '$q',
    '$timeout',
    '$rootScope',
    '$localStorage'
];

function LanguageService($q, $timeout, $rootScope, $localStorage) {

    var _all = {};
    var _sources = {};
    var _results = {};
    var _lang = $localStorage.lang || 'en';

    Object.defineProperties(this, {
        text: {
            get: function() {
                return _all[_lang] || false;
            }
        },
        lang: {
            get: function() {
                return _lang;
            }
        }
    });

    this.setSource = function(lang, source) {
        _sources[lang] = source;
    };

    this.setLang = function(lang) {
        _lang = $localStorage.lang = lang;
        return this.loadLang(lang);
    };

    this.loadLang = function(lang) {

        if (_results[lang]) {
            return _results[lang];
        }

        if (!_sources[lang]) {
            var msg = 'No data source specified for language:' + lang;
            console.error(msg);
            return $q.reject(msg);
        }

        _results[lang] = System.import(_sources[lang]).then(function(langData){
            $timeout(function(){
                var newData = {};
                newData[lang] = langData;
                angular.merge(_all, newData);
            });
            return langData;
        });

        return _results[lang];
    };
}
