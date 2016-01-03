angular.module("directives",[]).directive("datetimepicker",function(){
    return {
        restrict: "EA",
        require : "ngModel",
        link: function (scope, element, attrs, ctrl) {

            var unregister = scope.$watch(function(){

                $(element).append("<input id='date-"+attrs.dateid+"' style='border:none;width:100%;height:100%' " +
                "value='"+ctrl.$modelValue+"'>");
                $(element).css("padding","0");

                element.on('change', function() {
                    scope.$apply(function() {
                        ctrl.$setViewValue($("#date-"+attrs.dateid).val());
                    });
                });

                element.on('click',function(){
                    $("#date-"+attrs.dateid).datetimepicker({
                        format : attrs.format || 'Y/m/d h:i',
                        onClose : function(){
                            element.change();
                        }
                    });
                });

                element.click();

                return ctrl.$modelValue;
            }, initialize);

            function initialize(value){
                ctrl.$setViewValue(value);
                unregister();
            }
        }
    }
});
