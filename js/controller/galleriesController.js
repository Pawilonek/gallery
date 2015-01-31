var galleriesController = angular.module('galleriesController', []);

galleriesController.controller('galleriesCtrl', ['$scope', '$routeParams', 'Gallery',
    function ($scope, $routeParams, Gallery) {

        $scope.galleries = [];
        $scope.gallery = {};

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



    }]);


