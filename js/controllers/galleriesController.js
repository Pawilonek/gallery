angular.module('galleriesController', []).controller('galleriesCtrl',
    function ($scope, $routeParams, $sce, Gallery, $modal) {

        $scope.galleries = [];
        $scope.gallery = {};
        $scope.editedGalleryId = -1;

        $scope.defaultButtonValue = $sce.trustAsHtml('dodaj');
        $scope.spinner = $sce.trustAsHtml('<i class="fa fa-spin fa-spinner"></i>');
        $scope.buttonValue = $scope.defaultButtonValue;

        /**
         * Funkcja odpowiedzilna za dodanie nowej galerii
         */
        $scope.addGallery = function () {
            // otwarcie okienka odpowiedzilnego za dodanie nowej galerii
            $modal.open({
                animation: true,
                templateUrl: 'html/modals/newGalleryModal.html',
                controller: 'newGalleryModalCtrl'
            });
        };

        $scope.loadGalleries = function () {
            // Load all
            Gallery.get(function (response) {
                $scope.galleries = response.galleries;
            }, function (response) {
                // TODO: error
                console.log(response);
            });
        };

        $scope.loadGallery = function () {
            Gallery.get({id: $routeParams.galleryId}, function (response) {
                $scope.gallery = response.gallery;
            }, function (response) {
                // TODO: error
                console.log(response);
            });
        };

        $scope.deleteGallery = function (galleryId) {
            Gallery.delete({id: galleryId}, function (response) {
                $scope.$emit('alert', {type: 'success', msg: 'Galeria została usunięta.'});
                $scope.loadGalleries();
            });
        };

        $scope.editGallery = function (galleryId) {
            $scope.editedGalleryId = galleryId;
        };

        $scope.saveChanges = function (index) {
            console.log(index);
            var gallery = new Gallery();
            gallery.id = $scope.galleries[index].id;
            gallery.name = $scope.galleries[index].name;
            gallery.save();
            $scope.editedGalleryId = -1;
        };

    });
