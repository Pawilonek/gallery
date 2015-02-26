var galleriesController = angular.module('galleriesController', []);

galleriesController.controller('galleriesCtrl', ['$scope', '$routeParams', 'Gallery',
    function ($scope, $routeParams, Gallery) {

        $scope.galleries = [];
        $scope.gallery = {};
        $scope.editedGalleryId = -1;

        $scope.newGallery = '';
        $scope.addGallery = function () {
            if (!$scope.newGallery) {
                return false;
            }
            var gallery = new Gallery();
            gallery.name = $scope.newGallery;
            $scope.newGallery = '';
            gallery.$save(function () {
                $scope.loadGalleries();
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
            Gallery.get({galleryId: $routeParams.galleryId}, function (response) {
                $scope.gallery = response.gallery;
            }, function (response) {
                // TODO: error
                console.log(response);
            });
        };

        $scope.deleteGallery = function (galleryId) {
            Gallery.delete({galleryId: galleryId}, function (response) {
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
            gallery.id = $scope.galleries[index].Gallery.id;
            gallery.name = $scope.galleries[index].Gallery.name;
            gallery.$save();    
            $scope.editedGalleryId = -1;
        };

    }]);


