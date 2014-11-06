/**
 * Created by zhy on 2014/11/4.
 */
var app = angular.module('pagingApp', ['page.order']);

app.controller('PagingController', ['$scope', function($scope){
    var vm = $scope.vm = {};

    vm.page = {
        size: 5,
        index: 1
    };

    vm.sort = {
        column: 'id',
        direction: -1,
        toggle: function (column) {
            if(column.sortable === false){
                return;
            };
            if(this.column === column.name){
                this.direction = -this.direction || -1;
            }
            else
            {
                this.column = column.name;
                this.direction = -1;
            }
        }
    };

    vm.columns = [
        {
            label: 'ID',
            name: 'id',
            type: 'string'
        },
        {
            label: '姓名',
            name: 'name',
            type: 'string'
        },
        {
            label: '粉丝数',
            name: 'followers',
            type: 'number'
        },
        {
            label: '收入',
            name: 'income',
            type: 'currency'
        },
        {
            label: '',
            name: 'actions',
            sortable: false
        }
    ];

    vm.items = [];
    var MAX_NUM = 10 * 10;

    function rand(min, max){
        return min + Math.round(Math.random() * (max - min));
    }

    for(var i = 0; i < MAX_NUM; ++i){
        var id = rand(0, MAX_NUM);
        vm.items.push({
            id: i+1,
            name: 'Name' + id,
            followers: rand(0, 100 * 100),
            birthday: moment().subtract(rand(365, 365 * 50), 'day').toDate(),
            summary: 'this is test ' + i,
            income: rand(3000, 10000)
        });
    }

    /**
     * 根据生日计算年龄的方法（moment.js）
     * @param birthday
     * @returns age
     */
    vm.age = function (birthday) {
        return moment().diff(birthday, 'years');
    };
}]);