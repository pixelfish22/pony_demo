module.exports = Controller;

Controller.$inject = [
    'constants',
    '$rootScope',
    '$stateParams',
    'sidebarService',
    'pageTitleService'
];

function Controller(constants,
                    $rootScope,
                    $stateParams,
                    sidebarService,
                    pageTitleService) {

    this.title = pageTitleService;
    this.sidebarConfig = constants.sidebar;
    this.sidebarToggle = sidebarService.toggleNav;

    // I believe this could also be baked into the pagetitle component.
    // It seems pretty clear that if the route has title data, then that
    // is what we want to set in the page title.

    $rootScope.$on('$stateChangeSuccess', function (e, state) {
        if (state.data) {
            if (state.data.title) {
                pageTitleService.text = state.data.title;
            }
        } else {
            pageTitleService.text = '';
        }
    });

}
