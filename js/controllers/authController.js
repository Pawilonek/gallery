angular.module('authController', []).controller('authenticationsCtrl',
    function ($scope, $rootScope, $location, $modal) {
        // Role użytkowników dostępne w systemie
        const ROLE_USER = "user";
        const ROLE_ADMIN = "admin";
        // informacje o użytkowniku
        $scope.user = null;
        /**
         * Funkcja wywoływana po załadowaniu strony.
         *
         * @return {void}
         */
        $scope.init = function () {
            // Logowanie użytkownika
            $scope.login();
        };
        /**
         * Logowanie użytkownika na podstawie przekazanego
         * tokena lub danych zapisanych w pamięci przeglądarki.
         *
         * @return {void}
         */
        $scope.login = function (authToken) {
            // Sprawdzanie czy token został podany, jeżeli
            // nie to odczytywany jest z pamięci przeglądarki.
            authToken = authToken || localStorage.getItem("authToken");
            // Sprawdzanie czy otrzymaliśmy jakiś token.
            if (authToken === null) {
                return;
            }
            // Zapisywanie tokena w pamięci
            $rootScope.authToken = authToken;
            // Odczytwanie danych o użytkowniku
            // na podstawie danych z tokena.
            $scope.user = jwt_decode($rootScope.authToken);
        };
        /**
         * Funkcja 'wylogowuje' użytkownika.
         *
         * @return {void}
         */
        $scope.logout = function () {
            // usunięcie tokena z pamięci
            $rootScope.authToken = null;
            // usunięcie danych o użytkowniku
            $scope.user = null;
            // usunięcie tokena z pamięci przeglądarki
            localStorage.removeItem("authToken");
        };
        /**
         * Funkcja sprawdza czy użytkownik jest zalogowany.
         *
         * @return {boolean}
         */
        $rootScope.isLoggedIn = function () {
            return ($scope.user != null);
        };
        /**
         * Funkcja sprawdza czy użytkownik jest
         * zalogowany i czy ma role 'admin'.
         *
         * @return {boolean}
         */
        $rootScope.isAdmin = function () {
            // Sprawdzanie czy użytkownk jest zalogowany
            if (!$scope.user) {
                return false;
            }
            // sprawdzanie czy użytkownik jest administratorem
            return $scope.user.role === ROLE_ADMIN;
        };
        /**
         * Funkcja wyświetla nowe okienko które obsługuje proces logowania.
         *
         * @return {void}
         */
        $scope.openModal = function () {
            // generuj nowe okienko z obsługą logowania
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'partials/modals/loginModal.html',
                controller: 'authModalCtrl'
            });
            //
            modalInstance.result.then(function () {
                // logowanie się powiodło
                $scope.login($rootScope.authToken);
            }, function () {
                // okienko zostało zamknięte
            });
        };
        /**
         *
         * @return {void}
         */
        $scope.$on('sessionExpired', function () {
            $scope.$emit('alert', {type: 'danger', msg: 'Twoja sesja wygasła.'});
            $scope.logout();
        });
    }
).factory('authInterceptor',
    function ($rootScope, $q) {
        return {
            /**
             * Funkcja odpowiedzialna, jeżeli użytkownik jest zalogowany, za dodanie
             * do każdego zapytania nagłówka zawierającego uwierzytelniający token.
             *
             * @param config
             * @return {*}
             */
            'request': function (config) {
                config.headers = config.headers || {};
                if ($rootScope.authToken) {
                    config.headers.Authorization = $rootScope.authToken;
                }
                return config;
            },
            /**
             * Funkcja odpowiedzialna za nasłuchowanie odpowiedzi nadesłanych przez
             * serwer. Jeżeli odpowiedź zawierała kod 401 (Unauthorized) lub 403
             * (Forbidden) wyświetla stosowny komunikat i/lub uruchamia okienko logowania.
             *
             * @todo napisać tą funkcję
             * @param response
             * @return {*}
             */
            'responseError': function (response) {
                /*
                 if (response.status === 401 || response.status === 403) {
                 $location.path('/signin');
                 }
                 */
                return $q.reject(response);
            }
        };
    }
).config(
    function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
);

