var PonyListController = require('./ponies.list.ctrl').default;


//var ctrl = new PonyListController();
module.exports = {
    url: 'list/?sort&page',
    name: 'ponies.list',
    template: require('./ponies.list.html!text'),
    controller: PonyListController,
    controllerAs: 'ctrl',
    data: {
        title: 'List Ponies'
    }
};
