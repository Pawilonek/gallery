var authenticationsController = angular.module('authenticationsController', []);

authenticationsController.controller('authenticationsCtrl', ['$scope', '$rootScope', '$location', 'Authentication',
    function ($scope, $rootScope, $location, Authentication) {
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
            $scope.User.$save(function (response, headers) {
                console.log(response)
                $rootScope.userHash = response.hash.Authentication.hash;
                userHash = $rootScope.userHash;
                localStorage.setItem("userHash", response.hash.Authentication.hash);
                $location.path("/admin");
            }, function (response) {
                console.log(response);
            });
        };

        $scope.logout = function () {
            $rootScope.userHash = null;
            userHash = null;
            localStorage.removeItem("userHash");
            $location.path("/");
        };
        
        $scope.$on('sessionExpired', function(event) {
            $scope.$emit('alert', {type: 'danger', msg: 'Twoja sesja wygasła.'});
            $scope.logout();
        });
    }]);

authenticationsController.factory('authenticationInterceptor', ['$rootScope',
    function ($rootScope) {
        var interceptor = {
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
        return interceptor;
    }]).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptor');
    }]);
