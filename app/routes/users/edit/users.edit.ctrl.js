
module.exports = Controller;

Controller.$inject = ['$stateParams', 'userService'];

function Controller($stateParams, userService) {

    var _this = this;

    var id = $stateParams.id;

    userService.getById(id).then(function(user){
        _this.user = user;
    });

}
