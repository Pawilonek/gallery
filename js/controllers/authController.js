var authController = angular.module('authController', []);
authController.controller('authenticationsCtrl', function ($scope, $rootScope, $location, $modal, $route) {

    const ROLE_USER = "user";
    const ROLE_ADMIN = "admin";

    $scope.user = null;

    $scope.init = function () {
        if (localStorage.getItem("authToken") === null) {
            return;
        }
        $rootScope.authToken = localStorage.getItem("authToken");

        $scope.user = jwt_decode($rootScope.authToken);
    };

    $scope.logout = function () {
        $rootScope.authToken = null;
        $scope.user = null;
        localStorage.removeItem("authToken");
        $route.reload();
    };

    $rootScope.isLoggedIn = function () {
        return ($scope.user != null);
    };

    $rootScope.isAdmin = function () {
        if (!$scope.user) {
            return false;
        }

        return $scope.user.role === ROLE_ADMIN;
    };

    /*
     $scope.$on('sessionExpired', function () {
         $scope.$emit('alert', {type: 'danger', msg: 'Twoja sesja wygasła.'});
         $scope.logout();
     });
     */

    $scope.openModal = function () {
        // generuj nowy 'modal'
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'partials/modals/loginModal.html',
            controller: 'authModalCtrl'
        });
        // modal result
        modalInstance.result.then(function () {
            // użytkownik został zalogowany
            // odczytaj dane z otrzymanego tokena
            $scope.user = jwt_decode($rootScope.authToken);
            // przeładuj stronę
            $route.reload();
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
    };
}).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
}]);

var authModalController = angular.module('authModalController', []);
authModalController.controller('authModalCtrl', function ($scope, $modalInstance, $http, $rootScope, $sce) {

    $scope.errorMessage = '';
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
            then(function (response) {
                $scope.buttonValue = $scope.defaultButtonValue;
                $rootScope.authToken = response.data.token;
                localStorage.setItem("authToken", $rootScope.authToken);
                $modalInstance.close("loggedIn");
            }, function (response) {
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