var layoutsController = angular.module('layoutsController', []);

layoutsController.controller('layoutsCtrl', ['$scope', 'Layout',
    function ($scope, Layout) {
        $scope.images = {};

        $scope.saveeee = function (layout) {
            console.log(layout);
            layout.position_x = 500;
            Layout.update({layoutId:layout.id }, layout, function(data) {
                console.log(data);
            });
        };

        $scope.LoadLayout = function () {

            // Load only 1
            //Layout.get({layoutId: 3}, function(data) {
                //console.log(data);

                // save
                //var layout = data.layout.Layout;
                //$scope.saveeee(layout);
           // });



            /*
            // Add new Layout
            var layout = new Layout();
            layout.position_x = 300;
            layout.position_y = 200;
            layout.$save();
            */

            // Delete
            /*
            Layout.delete({layoutId: 4}, function(data) {
                console.log(data);
            });
            */

/*
            Layout.save({layoutId: 3}, function(data) {
                //console.log(data);
                layout = data;
            });
*/

            // Load all

            Layout.get(function (data) {
                angular.forEach(data.layouts, function (value, key) {
                    data.layouts[key].style = {
                        position: 'absolute',
                        width: value.Layout.size_x + 'px',
                        height: value.Layout.size_y + 'px',
                        left: value.Layout.position_x + 'px',
                        top: value.Layout.position_y + 'px'
                    };
                });
                $scope.images = data.layouts;
            });

        };

        $scope.init = function () {
            $scope.LoadLayout();
        };
    }]);


