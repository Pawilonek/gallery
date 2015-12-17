angular.module('newGalleryModalController', []).controller('newGalleryModalCtrl',
    function ($scope, $modalInstance, Gallery, $sce, $location) {
        // treść błędu
        $scope.errorMessage = '';
        // domyślna zawartość przycisku
        $scope.defaultButtonValue = $sce.trustAsHtml('dodaj');
        // kręciołek
        $scope.spinner = $sce.trustAsHtml('<i class="fa fa-spin fa-spinner"></i>');
        // aktualna zawartość przycisku
        $scope.buttonValue = $scope.defaultButtonValue;
        // obiekt zawieracjący nazwę galerii
        $scope.galleryName = '';
        /**
         * Funkcja odpowiedzialna za stworzenie nowej galerii.
         */
        $scope.newGallery = function () {
            // Sprawdzenie czy użytkownik podał jakąkolwiek nazwę
            if (!$scope.galleryName) {
                $scope.errorMessage = "Podaj nazwę galerii.";
                return;
            }
            // uruchomienie kręciołka
            $scope.buttonValue = $scope.spinner;
            // stworzenie nowej galerii
            var gallery = new Gallery();
            gallery.name = $scope.galleryName;
            // zapisanie nowej galerii
            gallery.$save(function (response) {
                // zamknięcie okienka
                $modalInstance.close();
                // przekierowanie na podstronę nowej galerii
                var url = "/galleries/" + response.gallery.id + "/" + response.gallery.slug;
                $location.path(url);
            }, function (response) {
                if (response.status == 400) {
                    // błędna nazwa galerii
                    $scope.errorMessage = "Galeria o podanej nazwie (lub bardzo podobnej) już istnieje.";
                } else {
                    // nieznany błąd
                    $scope.errorMessage = "Wystąpił błąd.";
                }
                // przywrócenie poprzedniego napisu na przycisku
                $scope.buttonValue = $scope.defaultButtonValue;
            });
        };
        /**
         * Funkcja odpowiedzialna za zamknięce okienka z formularzem.
         *
         * @return {void}
         */
        $scope.dismissModal = function () {
            $modalInstance.dismiss('cancel');
        };
    }
);
