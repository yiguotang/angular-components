/**
 * Created by zhy on 2014/11/6.
 */
var  orderFilter = angular.module('page.order', []);

/**
 * 正序或倒序的过滤器，使图标相应变化
 */
orderFilter.filter('sequenceOrder', [function () {
    return function (direction) {
        if(direction === -1){
            return "glyphicon-chevron-down";
        }
        else{
            return "glyphicon-chevron-up";
        }
    }
}])