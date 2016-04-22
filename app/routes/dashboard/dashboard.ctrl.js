
module.exports = Controller;

Controller.$inject = ['currentUser'];

function Controller(currentUser) {

    this.token = currentUser.token;

}
