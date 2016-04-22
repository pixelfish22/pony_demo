var _ = require('lodash');

module.exports = Controller;

Controller.$inject = ['$state', '$stateParams', 'userService'];

function Controller($state, $stateParams, userService) {

    var _this = this;

    userService.fetchAll().then(function(users){
        _this.users = _.values(users);
    });

    if (!$stateParams.sort) {
        $stateParams.sort = 'username';
    }

    this.params = $stateParams;

}
