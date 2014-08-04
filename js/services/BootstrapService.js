function DependancyService () {
    this.showModal = function(id) {
        $('#' + id).modal('show');
    }
}
angular
    .module('est')
    .service('DependancyService', DependancyService);