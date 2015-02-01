var authenticationsController = angular.module('authenticationsController', []);

authenticationsController.controller('authenticationsCtrl', ['$scope', '$location', 'Authentication',
    function ($scope, $location, Authentication) {
        $scope.User = {};
        $scope.userHash = '';
        
        $scope.init = function () {
            $scope.User = new Authentication();
            if (localStorage.getItem("userHash") != null ) {
                $scope.userHash = localStorage.getItem("userHash");
                userHash = $scope.userHash;
                // TODO: sprawdzanie czy sesja nie wygasła
            }
        };
        
        $scope.login = function () {
            $scope.User.$save(function (response) {
                $scope.userHash = response.hash.Authentication.hash;
                userHash = $scope.userHash;
                console.log(response);
                localStorage.setItem("userHash", $scope.userHash);
                $location.path("/admin");
            }, function (response) {
                console.log("error");
                console.log(response);
            });
        };
        
        $scope.logout = function () {
            $scope.userHash = null;
            userHash = null;
            $location.path("/");
            localStorage.removeItem("userHash", '');
        }
        
    }]);


