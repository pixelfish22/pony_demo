module.exports = {
    url: 'list/?sort&page',
    name: 'users.list',
    template: require('./users.list.html!text'),
    controller: require('./users.list.ctrl.js'),
    controllerAs: 'ctrl',
    data: {
        title: 'List Users'
    }
};
