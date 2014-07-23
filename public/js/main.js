var app = angular.module('est', []);

app.controller('studentsCtrl', ['$scope', '$http', function($scope, $http){
    $scope.editPopupOpened = true;
    $scope.user = {
        _id: "53ce91f68c0be927dbd3fa4c",
        firstname:"Tim",
        secondname: "Sakharchuk",
        type:"user"
    };
    $scope.studentEdit = function(action){
        if (action == 'open') $scope.editPopupOpened = true;
        if (action == 'close') $scope.editPopupOpened = false;
    };

    $scope.save = function(){
        $http({
            method: 'POST',
            url: 'http://so/api/save',
            data: $scope.user
        })
    };
}]);