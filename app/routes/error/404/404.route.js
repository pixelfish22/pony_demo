module.exports = {
    name: 'error.404',
    controller: require('./404.ctrl'),
    template: require('./404.html!text'),
    data: {
        title: 'Not Found'
    }
};
