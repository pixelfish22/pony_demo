module.exports = function () {
    return function (exception, cause) {
        console.log('Exception:', cause);
        console.error(exception.stack);

        // Something like this can be used to report UI errors
        // to a third-party logging service.  This could also
        // be something that is baked into the WebUI-Core.
    };
};
