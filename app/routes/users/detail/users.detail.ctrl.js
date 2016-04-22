
module.exports = Controller;

Controller.$inject = ['$state', '$stateParams', 'userService'];

function Controller($state, $stateParams, userService) {

    var _this = this;

    var id = $stateParams.id;

    if (id) {

        userService.getById(id).then(function(user){
            _this.user = user;
        });

    } else {

        $state.go('error.404');

    }

}
