var _ = require('lodash');

var fakeUsers = require('data/fake.users');

module.exports = UserService;

UserService.$inject = ['$q'];

function UserService($q) {

    var _users = {};

    Object.defineProperties(this, {
        users: {
            get: function(){
                return _users;
            }
        }
    });

    /**
     * Fetch all users from the fake user data.
     * Promise resolved with an object of users.
     *
     * @returns Promise
     */
    this.fetchAll = function () {
        return $q.when(fakeUsers).then(function(users){
            _.each(users, function(user){
                _users[user.user.username] = user.user;
            });
            return _users;
        });
    };

    /**
     * Fetch a single user by their ID (random data)
     * Promise resolved with a single user object.
     *
     * @param {string} id
     * @returns Promise
     */
    this.getById = function (id) {
        return this.fetchAll().then(function(users) {
            return users[id];
        });
    };
}
