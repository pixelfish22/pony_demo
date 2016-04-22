module.exports = {
    name: 'dashboard',
    url: '/dashboard/',
    template: require('./dashboard.html!text'),
    controller: require('./dashboard.ctrl'),
    controllerAs: 'ctrl',
    data: {
        title: 'Dashboard'
    }
};
