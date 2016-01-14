angular.module('galleriesController', []).controller('galleriesCtrl',
    function ($scope, $routeParams, $sce, Gallery, $modal, $location, File, Layout) {

        $scope.galleries = [];
        $scope.gallery = {};
        $scope.editedGalleryId = -1;
        $scope.images = [];

        $scope.defaultButtonValue = $sce.trustAsHtml('dodaj');
        $scope.spinner = $sce.trustAsHtml('<i class="fa fa-spin fa-spinner"></i>');
        $scope.buttonValue = $scope.defaultButtonValue;

        $scope.gridsterOptsAdmin = {
            columns: 6,
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            defaultSizeX: 2,
            defaultSizeY: 1,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                stop: function (event, $element, widget) {
                    $scope.saveLayout();
                }
            },
            draggable: {
                enabled: true,
                stop: function (event, $element, widget) {
                    $scope.saveLayout();
                }
            }
        };

        $scope.gridsterOpts = {
            columns: 6,
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            resizable: {
                enabled: false
            },
            draggable: {
                enabled: false
            }
        };


        $scope.a = function () {
            $scope.gridsterOpts.resizable.enabled = false;
            $scope.gridsterOpts.draggable.enabled = false;
        };

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

        $scope.deleteGallery = function (gallery) {
            Gallery.delete({id: gallery.id}, function (response) {
                $location.path("/galleries");
            });
        };

        /**
         * Funkcja odpowiedzialna za pokazanie okienka umożliwiwającego zmiasę nazwy galerii
         *
         * @param gallery
         */
        $scope.editGallery = function (gallery) {
            // otwarcie modala
            $modal.open({
                animation: true,
                templateUrl: 'html/modals/changeGalleryModal.html',
                controller: 'changeGalleryModalCtrl',
                resolve: {
                    // przekazanie informacji o edytowanej galerii
                    gallery: function () {
                        return gallery;
                    }
                }
            });
        };

        $scope.saveChanges = function (index) {
            console.log(index);
            var gallery = new Gallery();
            gallery.id = $scope.galleries[index].id;
            gallery.name = $scope.galleries[index].name;
            gallery.save();
            $scope.editedGalleryId = -1;
        };

        $scope.saveLayout = function () {
            var layouts = $scope.gallery.layouts;
            for (var i = 0; i < layouts.length; i++) {
                var layout = new Layout();
                layout.id = layouts[i].id;
                layout.position_x = layouts[i].position_x;
                layout.position_y = layouts[i].position_y;
                layout.size_h = layouts[i].size_h;
                layout.size_w = layouts[i].size_w;
                layout.save();
            }
        };

        $scope.addImage = function (imageId) {
            var layout = new Layout();
            layout.image_id = imageId;
            layout.gallery_id = $routeParams.galleryId;
            layout.position_x = 0;
            layout.position_y = 100;
            layout.size_h = 1;
            layout.size_w = 2;
            layout.$save(function () {
                $scope.loadGallery();
            });
        };

        $scope.init = function () {

            $scope.loadImages();

        };

        $scope.loadImages = function () {
            File.get(function (response) {
                $scope.images = response.images;
            }, function (response) {

            });
        };

        $scope.deleteLayout = function (id) {
            Layout.delete({id: id}, function () {
                $scope.loadLayouts();
            });
        };

    }
);
