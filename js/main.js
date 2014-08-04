var app = angular.module('est', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: "students.html",
            controller: "studentsCtrl",
            resolve: {
                loadData: studentsCtrl.loadData
            }
        })
        .when('/tech', {
            templateUrl: "techs.html"
        }).otherwise({
            template: "This doesn't exist!"
        })
});

app.factory('studentsFactory', function ($http) {
    return {
        getStudents: function () {
            return $http.get('http://so/api/list-all/type/user');
        }
    };
});

var studentsCtrl = app.controller('studentsCtrl', function ($scope, studentsFactory) {
    $scope.students = [];
    studentsFactory.getStudents().success(function (data) {
        $scope.students = data;
        console.log($scope.students);
    });
    console.log($scope.students);

    /*$scope.editPopupOpened = true;
    $scope.user = {
        _id: "53ce91f68c0be927dbd3fa4c",
        firstname: "Tim",
        secondname: "Sakharchuk",
        type: "user"
    };
    $scope.studentEdit = function (action) {
        if (action == 'open') $scope.editPopupOpened = true;
        if (action == 'close') $scope.editPopupOpened = false;
    };

    $scope.save = function () {
        $http({
            method: 'POST',
            url: 'http://so/api/save',
            data: $scope.user
        })
    };*/
});

studentsCtrl.loadData = function ($q, $http, $scope) {
    var defer = $q.defer();

    $http.get('http://so/api/list-all/type/user').success(function (data) {
        $scope.students = data;
        console.log($scope.students);
        console.log(data);
        defer.resolve("loadData");
    });
    return defer.promise;
}