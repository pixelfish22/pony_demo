
class PoniesListController{
    constructor(PonyService){
        this.ponyService = PonyService;
        this.ponies = ['Twilight', 'AppleJack', 'Fluttershy'];
        this.ponyService.getTags().then(function(response){
           console.log('response', response);
        });
    }

}

PoniesListController.$inject=['PonyService'];

export default PoniesListController;
