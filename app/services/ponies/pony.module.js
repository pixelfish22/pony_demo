import PonyService from './pony.service';

const MODULE_NAME = 'ponies.service';

angular
    .module(MODULE_NAME, [])
    .service('PonyService', PonyService);

console.log('pony service', MODULE_NAME);

export default MODULE_NAME;
