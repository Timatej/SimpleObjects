function StudentsService ($http, DependancyService, SaverService) {
    //var for resolve objects
    var self = this;
    this.students = [];
    this.student = {};

    this.getStudents = function(){
        return $http.get('http://so/api/list-all/type/user').then(function (response) {
            self.students = response.data;
        });
    }

    this.edit = function(id){
        this.student = this.students[id];

        delete this.student.edit;
        this.student.edit = angular.copy(this.students[id]);

        DependancyService.showModal('edit_student_modal');
    }

    this.save = function(){
        //save to page scope
        angular.copy(this.student.edit, this.student);

        if (this.student._id == 'new')
            this.students.push(this.student);

        //save to backend
        SaverService.save(this.student);

    }

    this.add = function(){
        this.student = {};
        this.student.edit = {};
        this.student.edit.type = 'user';
        this.student.edit._id = 'new';

        DependancyService.showModal('edit_student_modal');
    }

    this.remove = function(id){
        this.students.slice(id,1);
    }
}
angular
    .module('est')
    .service('StudentsService', StudentsService);