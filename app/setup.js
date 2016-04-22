
var _ = require('lodash');

module.exports = Setup;

Setup.$inject = [
    'constants',
    'languageService'
];

function Setup(constants, languageService) {

    // Set each of the language sources for the locales specified
    // in the constants file. This doesn't load any data yet, it
    // just sets

    _.each(constants.locales, function(localeData, locale) {
        languageService.setSource(locale, localeData.langSource);
    });

    languageService.setLang('en');

}
