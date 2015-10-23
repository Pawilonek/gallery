angular.module('authModalController', []).controller('authModalCtrl',
    function ($scope, $modalInstance, $http, $rootScope, $sce) {
        // treść błędu
        $scope.errorMessage = '';
        // domyślna zawartość przycisku
        $scope.defaultButtonValue = $sce.trustAsHtml('zaloguj');
        // kręciołek
        $scope.spinner = $sce.trustAsHtml('<i class="fa fa-spin fa-spinner"></i>');
        // aktualna zawartość przycisku
        $scope.buttonValue = $scope.defaultButtonValue;
        // obiekt zawieracjący nazwę użytkownika i hasło
        $scope.User = {
            username: '',
            password: ''
        };
        /**
         * Funkcja odpowiedzialna za zalogowanie użytkownika na
         * podstawie danych zapisanych w obiekcje User.
         *
         * @return {void}
         */
        $scope.login = function () {
            // Sprawdzanie czy login i hasło zostały podane.
            if (!$scope.User.username || !$scope.User.password) {
                $scope.errorMessage = "Podaj login i/lub hasło!";
                return;
            }
            // Zamiana zawartości przycisku na kręciłek
            $scope.buttonValue = $scope.spinner;
            // Przygotowanie danych wysyłanych na serwer.
            var data = {
                username: $scope.User.username,
                password: $scope.User.password
            };
            // Wysłanie zapytania POST
            $http.post(config.apiUrl + 'users/login', data).then(
                // Jeżeli otrzymamy poprawną odpoweidź
                function (response) {
                    // Zmiana zawartości pzycisku na domyślną
                    $scope.buttonValue = $scope.defaultButtonValue;
                    // Sprawdzanie czy w odpowiedzi dostaliśmy token
                    if (!response.data.token) {
                        // Token powinien być w tej odpowiedzi.
                        // Prawdopodobnie wystąpił błąd po stronie api.
                        $scope.errorMessage = "Wystąpił nieznany błąd.";
                        return;
                    }
                    // Zapisanie otrzymanego tokenu do blobalnej zmiennej
                    $rootScope.authToken = response.data.token;
                    // Zapisanie tokena w pamięci przeglądarki.
                    localStorage.setItem("authToken", response.data.token);
                    // Zamknięce okienka z formularzem logowania
                    $modalInstance.close();
                },
                // Jeżeli otrzymamy błędną odpowiedź
                function (response) {
                    // Zmiana zawartości pzycisku na domyślną
                    $scope.buttonValue = $scope.defaultButtonValue;
                    // Sprawdzanie kodu odpowiedzi
                    if (response.status == 401) {
                        // Prawdopodobnie niepoprawny login i/lub hasło
                        $scope.errorMessage = "Niepoprawny login i/lub hasło.";
                        return;
                    }
                    // Nieznany błąd, po stronie api
                    $scope.errorMessage = "Wystąpił nieznany błąd.";
                }
            );
        };
        /**
         * Funkcja odpowiedzialna za zamknięce
         * okienka z formularzem do logowania.
         *
         * @return {void}
         */
        $scope.dismissModal = function () {
            $modalInstance.dismiss('cancel');
        };
    });
