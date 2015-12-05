angular.module('loaderController', []).controller('loaderCtrl',
    function ($rootScope, $scope) {
        $rootScope.numOfRequests = 0;
    }
).factory('loaderInterceptor',
    function ($rootScope, $q) {
        return {
            'request': function (config) {
                $rootScope.numOfRequests++;
                return config;
            },
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },
            'response': function(response) {
                $rootScope.numOfRequests--;
                return response;
            },
            'responseError': function (response) {
                $rootScope.numOfRequests--;
                return $q.reject(response);
            }
        };
    }
).config(
    function ($httpProvider) {
        $httpProvider.interceptors.push('loaderInterceptor');
    }
);
