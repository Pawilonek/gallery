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
         *
         */
        $scope.newGallery = function () {
            if (!$scope.galleryName) {
                $scope.errorMessage = "Podaj nazwę galerii.";
                return;
            }

            $scope.buttonValue = $scope.spinner;

            var gallery = new Gallery();
            gallery.name = $scope.galleryName;
            gallery.$save(function (response) {
                var url = "/galleries/" + response.gallery.id + "/" + response.gallery.slug;
                $location.path(url);
                $scope.buttonValue = $scope.defaultButtonValue;
                $modalInstance.close();
            }, function (response) {
                console.log(response);
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
    });
