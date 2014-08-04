function SaverService($http) {
    this.save = function(item) {
        //getting static copy, but not linc
        var toSave = angular.copy(item);

        $http.post('/api/save', toSave).success(function(data){
            //background backend sync
            angular.copy(data, item);
        });
    }
}

angular
    .module('est')
    .service('SaverService', SaverService);