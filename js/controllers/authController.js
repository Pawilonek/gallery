var authController = angular.module('authController', []);
authController.controller('authenticationsCtrl', function ($scope, $rootScope, $location, $modal) {

        $scope.init = function () {
            if (localStorage.getItem("authToken") === null) {
                return;
            }
            $rootScope.authToken = localStorage.getItem("authToken");
        };

        $scope.logout = function () {
            $rootScope.authToken = null;
            localStorage.removeItem("authToken");
            $location.path("/");
        };

        /*
        $scope.$on('sessionExpired', function () {
            $scope.$emit('alert', {type: 'danger', msg: 'Twoja sesja wygasła.'});
            $scope.logout();
        });
        */

        $scope.openModal = function () {
            // generate modal
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'partials/modals/loginModal.html',
                controller: 'authModalCtrl'
            });
            // modal result
            modalInstance.result.
                then(function () {
                    // user logged in
                    $location.path("/admin");
                }, function () {
                    // modal dismissed
                });
        };
    });

authController.factory('authenticationInterceptor', function ($rootScope, $q) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($rootScope.authToken) {
                    config.headers.Authorization = $rootScope.authToken;
                }
                return config;
            },
            'responseError': function (response) {
                /*
                if (response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                */
                return $q.reject(response);
            }
            /*
            request: function (request) {
                //console.log('request');
                //console.log(request);
                request.headers.Authorization = $rootScope.authToken;
                return request;
            }

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
            */
        };
    }).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
}]);

var authModalController = angular.module('authModalController', []);
authModalController.controller('authModalCtrl', function ($scope, $modalInstance, $http, $rootScope, $sce) {

    $scope.errorMessage  = '';
    $scope.defaultButtonValue = $sce.trustAsHtml('zaloguj');
    $scope.spinner = $sce.trustAsHtml('<i class="fa fa-spin fa-spinner"></i>');
    $scope.buttonValue = $scope.defaultButtonValue;
    $scope.User = {
        username: '',
        password: ''
    };

    $scope.login = function () {
        if (!$scope.User.username || !$scope.User.password) {
            $scope.errorMessage = "Podaj login i/lub hasło!";
            return false;
        }

        $scope.buttonValue = $scope.spinner;

        var data = {
            username: $scope.User.username,
            password: $scope.User.password
        };

        $http.post(apiUrl + 'users/login', data).
            then(function(response) {
                $scope.buttonValue = $scope.defaultButtonValue;
                $rootScope.authToken = response.data.token;
                localStorage.setItem("authToken", $rootScope.authToken);
                $modalInstance.close("loggedIn");
            }, function(response) {
                $scope.buttonValue = $scope.defaultButtonValue;
                console.log("error");
                console.log(response);
                $scope.errorMessage = "Niepoprawny login i/lub hasło.";
            });
    };

    $scope.dismissModal = function () {
        $modalInstance.dismiss('cancel');
    };
});