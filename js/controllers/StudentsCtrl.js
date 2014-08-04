function StudentsCtrl (StudentsService) {
    this.students = StudentsService.students;
    this.student = StudentsService.student;
    this.edit = StudentsService.edit;
    this.save = StudentsService.save;
    this.add = StudentsService.add;
    this.remove = StudentsService.remove;

}

StudentsCtrl.resolve = {
    getStudents: function(StudentsService){
        return StudentsService.getStudents();
    }
}

function StudentsConfig ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/students.html',
            controller: 'StudentsCtrl',
            controllerAs: 'students',
            resolve: StudentsCtrl.resolve
        });
}

angular
    .module('est')
    .controller('StudentsCtrl', StudentsCtrl)
    .config(StudentsConfig);

