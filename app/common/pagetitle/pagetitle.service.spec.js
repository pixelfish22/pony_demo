require('test/harness');

describe('pagetitle.service', function() {

    var instance;

    var Service = require('./pagetitle.service');

    var languageServiceMock = {
        text: {
            foo: 'foobarbaz'
        }
    };

    beforeEach(function(){
        instance = new Service(languageServiceMock);
    });

    it('should have a text member', function(){
        expect(instance).toHaveMember('text');
    });

    it('should use languageService to lookup text', function(){
        instance.text = 'foo';
        expect(instance.text).toBe('foobarbaz');
    });

    it('should update as languageService data changes', function(){
        instance.text = 'foo';
        languageServiceMock.text.foo = 'bazbarfoo';
        expect(instance.text).toBe('bazbarfoo');
    });

});
