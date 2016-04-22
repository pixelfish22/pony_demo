

class PonyService {
    constructor($http){
        this.$http = $http;
        this.baseUrl = 'http://ponyfac.es/api.json';

    }
    getTags(){
        return $http.get(this.baseUrl+'/tags');

    }
    getTagImages(){

    }
}

PonyService.$inject = ['$http'];

export default PonyService;
