module.exports = {

    locales: {
        en: {
            langSource: 'lang/lang.en'
        },
        ru: {
            langSource: 'lang/lang.ru'
        },
        uk: {
            langSource: 'lang/lang.uk'
        }
    },

    sidebar: {
        title: {
            displayName: 'SPS Example',
            iconClass: 'fa fa-globe fa-lg'
        },
        items: [
            {
                'id': 'dashboard',
                'displayName': 'Dashboard',
                'iconClass': 'fa fa-tachometer fa-lg',
                'routingState': 'dashboard'
            }, {
                'id': 'users',
                'displayName': 'Users',
                'iconClass': 'fa fa-users fa-lg',
                'routingState': 'users'
            }, {
                'id': 'ponies',
                'displayName': 'Ponies',
                'iconClass': 'fa fa-fort-awesome fa-lg',
                'routingState': 'ponies'
            }
        ]
    }

};
