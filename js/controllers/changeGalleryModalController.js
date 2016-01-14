angular.module('changeGalleryModalController', []).controller('changeGalleryModalCtrl',
    function ($scope, $modalInstance, Gallery, $sce, $location, gallery) {
        // treść błędu
        $scope.errorMessage = '';
        // domyślna zawartość przycisku
        $scope.defaultButtonValue = $sce.trustAsHtml('zapisz');
        // kręciołek
        $scope.spinner = $sce.trustAsHtml('<i class="fa fa-spin fa-spinner"></i>');
        // aktualna zawartość przycisku
        $scope.buttonValue = $scope.defaultButtonValue;
        // obiekt zawieracjący edytowaną galerii
        $scope.gallery = gallery;
        // nowa nazwa galerii
        $scope.galleryName = gallery.name;
        /**
         *
         */
        $scope.changeGallery = function () {
            var newGallery = $scope.galleryName;
            // Sprawdzenie czy użytkownik podał jakąkolwiek nazwę
            if (!newGallery) {
                $scope.errorMessage = "Podaj nazwę galerii.";
            }
            // uruchomienie kręciołka
            $scope.buttonValue = $scope.spinner;
            // przygotowanie danych do zapisu
            var gallery = new Gallery();
            gallery.name = newGallery;
            gallery.id = $scope.gallery.id;
            // zapisanie zmian
            gallery.save(function (response) {
                // zamknięcie okienka
                $modalInstance.close();
                // przekierowanie na podstronę edytowanej galerii
                var url = "/galleries/" + response.gallery.id + "/" + response.gallery.slug;
                $location.path(url);
            }, function (response) {
                console.log(response.status);
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
