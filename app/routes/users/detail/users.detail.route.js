
module.exports = {
    url: '{id}/',
    name: 'users.detail',
    template: require('./users.detail.html!text'),
    controller: require('./users.detail.ctrl'),
    controllerAs: 'ctrl',
    data: {
        title: 'User Profile'
    }
};
