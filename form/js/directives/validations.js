/**
 * 针对如何动态将自定义验证指令添加到DOM元素上，
 * 笨方法：
 *      将指令都添加到模板上，并在每个自定义验证指令中进行适当判断，如果不属于自己要验证的DOM元素放过
 *      实现问题：
 *          如何实现在校验指令中过滤非验证DOM?
 */

var validate = angular.module('form.validation', []);

//ajax请求数据库验证唯一性
validate.directive('ensureUnique', ['$http', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                $http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,
                    data: {'field': attrs.ensureUnique}
                }).success(function (data) {
                    ctrl.$setValidity('unique', true);
                }).error(function (data) {
                    ctrl.$setValidity('unique', false);
                })
            })
        }
    };
}]);

//placehold directive to solve the confiliction of ngModel, but it looks like does't work
validate.directive('placehold', function(){
    return {
        restrict: 'A',
        require: 'ngModel',        
        link: function(scope, element, attrs, ctrl){
            var value;

            //insert the placehold val
            var placehold = function(){
                element.val(attrs.placehold);
            };

            var unplacehold = function(){
                element.val('');
            };

            scope.$watch(attrs.ngModel, function(val){
                value = val || '';
            });

            //when the mouse focus the element, clear the placehold
            element.bind('focus', function(){
                if(value == ''){
                    unplacehold();
                }
            });

            //when the mouse blur the element, insert the placehold contant
            element.bind('blur', function(){
                if(element.val() == ''){
                    placehold();
                }
            });     

            ctrl.$formatters.unshift(function(val){
                if (!val) {
                    placehold();
                    value = '';
                    return attrs.placehold;
                };
                return val;
            });
        }   
    };
});

/**
怎样获得表单元素的name属性，同时怎样拼接到form的那么上，进行ngShow的判断
怎样让每个元素的一一对应到相对应的验证信息上：
	<span ng-show="myForm.size.$error.integer">不是合法的整数！</span>
此时只是一个判断，当有多个判断时如何处理：
	<span ng-show="myForm.size.$error.min || myForm.size.$error.max">
                        数值必须位于0到10之间！
        </span>

*/

//验证两次密码的一致性


//密码的正则校验


//邮箱的正则校验


//年龄的校验（正整数，范围）
