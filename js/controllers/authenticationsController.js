var authenticationsController = angular.module('authenticationsController', []);

authenticationsController.controller('authenticationsCtrl', ['$scope', '$rootScope', '$location', 'Authentication', '$modal',
    function ($scope, $rootScope, $location, Authentication, $modal) {
        $scope.User = {};

        $scope.init = function () {
            $scope.User = new Authentication();
            if (localStorage.getItem("userHash") === null) {
                return;
            }
            $rootScope.userHash = localStorage.getItem("userHash");
            userHash = $rootScope.userHash;
        };

        $scope.login = function () {
            if (!$scope.User.username || !$scope.User.password) {
                $scope.errorMessage = "Podaj login i hasło!";
                return false;
            }
            $scope.User.$save(function (response) {
                if (!response.hash) {
                    $scope.errorMessage = response.message;
                    return false;
                }
                $rootScope.userHash = response.hash.Authentication.hash;
                userHash = $rootScope.userHash;
                localStorage.setItem("userHash", response.hash.Authentication.hash);
                $location.path("/admin");
            });
        };

        $scope.logout = function () {
            $rootScope.userHash = null;
            userHash = null;
            localStorage.removeItem("userHash");
            $location.path("/");
        };

        $scope.$on('sessionExpired', function () {
            $scope.$emit('alert', {type: 'danger', msg: 'Twoja sesja wygasła.'});
            $scope.logout();
        });

        $scope.openModal = function () {
            $modal.open({
                templateUrl: 'partials/modals/loginForm.html',
                controller: 'authenticationsCtrl'
            });
/*
            $scope.modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
            */
        };
    }]);

authenticationsController.factory('authenticationInterceptor', ['$rootScope',
    function ($rootScope) {
        return {
            request: function (request) {
                //console.log('request');
                //console.log(request);
                request.headers.userHash = $rootScope.userHash;
                return request;
            },
            requestError: function (request) {
                //console.log('requestError');
                //console.log(request);
                return request;
            },
            response: function (response) {
                //console.log('response');
                //console.log(response);
                return response;
            },
            responseError: function (response) {
                //console.log('responseError');
                //console.log(response);
                if (response.status === 403 && response.data.message === "sessionExpired") {
                    $rootScope.$broadcast('sessionExpired');
                }
                return response;
            }
        };
    }]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
}]);
