class PoniesListController {
    constructor(PonyService) {
        this.ponyService = PonyService;
        this.ponies = [];
        this.tags = ['twilight sparkle', 'applejack', 'fluttershy'];
        this.ponyService.getTags().then((response) => {
            console.log('response', response);
            this.tags = response.data.tags;
            console.log('this', this.tags);
        });
    }

    getPonies(tag) {
        this.ponyService.getPonies(tag).then(response => {
            console.log('response', response);
            this.ponies = response.data.faces;
        });
    }
}
PoniesListController.$inject = ['PonyService'];
export default PoniesListController;
