
module.exports = {
    url: '{id}/edit/',
    name: 'users.edit',
    template: require('./users.edit.html!text'),
    controller: require('./users.edit.ctrl'),
    controllerAs: 'ctrl',
    data: {
        title: 'Edit User'
    }
};
