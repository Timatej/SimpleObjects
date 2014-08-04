function TechsCtrl() {
    this.test = 'ggg1';
}

function TechsConfig($routeProvider) {
    $routeProvider
        .when('/tech', {
            templateUrl: 'views/techs.html',
            controller: 'TechsCtrl',
            controllerAs: 'techs'
        })
}

angular
    .module('est')
    .controller('TechsCtrl', TechsCtrl)
    .config(TechsConfig);