var authenticationsController = angular.module('authenticationsController', []);

authenticationsController.controller('authenticationsCtrl', ['$scope', '$http', '$location', 'Authentication',
    function ($scope, $http, $location, Authentication) {
        $scope.User = {};
        $scope.userHash = '';
        
        $scope.init = function () {
            $scope.User = new Authentication();
            if (localStorage.getItem("userHash") != null ) {
                $scope.userHash = localStorage.getItem("userHash");
                userHash = $scope.userHash;
                $http.defaults.headers.common.userHash = $scope.userHash;
                // TODO: sprawdzanie czy sesja nie wygasła
            }
        };
        
        $scope.login = function () {
            $scope.User.$save(function (response) {
                $scope.userHash = response.hash.Authentication.hash;
                userHash = response.hash.Authentication.hash;
                localStorage.setItem("userHash", response.hash.Authentication.hash);
                $http.defaults.headers.common.userHash = response.hash.Authentication.hash;
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


