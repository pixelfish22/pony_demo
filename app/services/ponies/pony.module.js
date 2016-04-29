import PonyService from './pony.service';

const MODULE_NAME = 'ponies.service';
const SERVICE_NAME = 'PonyService';

angular
    .module(MODULE_NAME, [])
    .service(SERVICE_NAME, PonyService);

export default SERVICE_NAME;

import myService from './myService';
const MODULE_NAME = "myModule"
export default angular.module(MODULE_NAME)
    .service('myService', myService).name
export default MODULE_NAME

import myModule from './myModule';
angular.module('myOtherModule', [myModule]);
