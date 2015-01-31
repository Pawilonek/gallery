var galleriesController = angular.module('galleriesController', []);

galleriesController.controller('galleriesCtrl', ['$scope', '$routeParams', 'Gallery',
    function ($scope, $routeParams, Gallery) {

        $scope.galleries = [];
        $scope.gallery = {};

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
                $scope.loadGalleries();
            });
        };

    }]);


