module.exports = PageTitleService;

PageTitleService.$inject = ['languageService'];

function PageTitleService(languageService) {

    var _text = '';

    Object.defineProperties(this, {
        text: {
            get: function () {
                return languageService.text[_text];
            },
            set: function (val) {
                _text = val;
            }
        }
    });

}
