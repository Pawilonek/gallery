var adminController = angular.module('adminController', []);

adminController.controller('adminCtrl', ['$scope', "$rootScope", '$location', 'FileUploader',
    function ($scope, $rootScope, $location, FileUploader) {

        $scope.init = function () {
            if ($rootScope.authToken == null) {
                $location.path("/");
                return false;
            }
        };

        var uploader = $scope.uploader = new FileUploader({
            url: config.apiUrl + 'images.json',
            method: 'POST',
            headers: {
                Authorization: $rootScope.authToken
            }
        });

        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
            fileItem.upload();
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

    }]);

// Layouts
adminController.controller('adminGalleryCtrl', ['$scope', '$routeParams', '$location', 'File', 'Layout', 'Gallery',
    function ($scope, $routeParams, $location, File, Layout, Gallery) {

        $scope.images = [];
        $scope.layouts = [];
        $scope.gallery = {};
/*
        $scope.customItems = [
            { size: { x: 2, y: 1 }, position: [0, 0] },
            { size: { x: 1, y: 1 }, position: [0, 4] },
            { size: { x: 1, y: 1 }, position: [0, 5] },
            { size: { x: 2, y: 1 }, position: [1, 0] },
            { size: { x: 1, y: 1 }, position: [1, 4] },
            { size: { x: 1, y: 2 }, position: [1, 5] },
            { size: { x: 1, y: 1 }, position: [2, 0] },
            { size: { x: 2, y: 1 }, position: [2, 1] },
            { size: { x: 1, y: 1 }, position: [2, 3] },
            { size: { x: 1, y: 1 }, position: [2, 4] }
        ];
*/
        //$scope.$watch('layouts', function(layouts){
        //
        //}, true);

        $scope.print = function() {
            console.log($scope.layouts);
        };

        $scope.addImage = function (imageId) {
            var layout = new Layout();
            layout.image_id = imageId;
            layout.gallery_id = $routeParams.galleryId;
            layout.$save(function () {
                $scope.loadLayouts();
            });
        };

        $scope.loadLayouts = function () {
            Gallery.get({id: $routeParams.galleryId}, function (response) {
                $scope.gallery = response.gallery;
                $scope.layouts = response.gallery.layouts;
            });
        };

        $scope.init = function () {
            /*
            if (userHash == null) {
                $location.path("/");
                return false;
            }
            */
            $scope.loadImages();
            $scope.loadLayouts();
            $(".adminLayout").droppable({
                // activeClass: "ui-state-default",
                // hoverClass: "ui-state-hover",
                // accept: ":not(.ui-sortable-helper)",
                greedy: true,
                tolerance: "touch",
                drop: function (event, ui) {
                    /*
                     console.log(this);
                     console.log(event);
                     console.log(ui);
                     */
                    $scope.addImage(ui.helper[0].dataset.id);
                    /*
                     $scope.$apply(function () {
                     $scope.message = "Timeout called!";
                     });
                     */
                }
            });
        };

        $scope.loadImages = function () {
            File.get(function (response) {
                $scope.images = response.images;

                // TODO: zrobić to ładniej / kręciołek
                setTimeout(function () {
                    $(".uploadedImages").draggable({
                        appendTo: "body",
                        helper: "clone"
                    });
                }, 1000);

            }, function (response) {
                console.log(response);
                // TODO: error
            });
        };
        
        $scope.deleteLayout = function (id) {
            Layout.delete({layoutId:id}, function(){
                $scope.loadLayouts();
            });
        };


    }]);
