
class PonyService {
    constructor($http){
        this.$http = $http;
        this.baseUrl = 'http://ponyfac.es/api.jsonp:JSON_CALLBACK';

    }
    getTags(){
        return this.$http.jsonp(this.baseUrl+'/tags');

    }
    getPonies(tag){
        return this.$http.jsonp(this.baseUrl+'/tag:'+tag);
    }
}

PonyService.$inject = ['$http'];

export default PonyService;
