/**
 * Created by zhy on 2014/11/3.
 */
var app = angular.module('formApp', ['form.validation']);

app.controller('FormController', ['$scope', '$http', function ($scope, $http) {
    $http.get("../data/data.json")
        .success(function (data) {
            $scope.fields = data;
        });

    $scope.submitForm = function(){
        //$http.post()
        console.log($scope.fields);
    };
}]);