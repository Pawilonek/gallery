var adminController = angular.module('adminController', []);

adminController.controller('adminCtrl', ['$scope', 'FileUploader',
    function ($scope, FileUploader) {

        $scope.init = function () {
            if (userHash == null) {
                // TODO: wywalenie usera
            }
        }

        var uploader = $scope.uploader = new FileUploader({
            url: apiUrl + 'files.json',
            method: 'POST'
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
adminController.controller('adminGalleryCtrl', ['$scope', '$routeParams', 'File', 'Layout', 'Gallery',
    function ($scope, $routeParams, File, Layout, Gallery) {

        $scope.images = [];
        $scope.layouts = [];
        $scope.gallery = {};

        $scope.addImage = function (imageId) {
            var layout = new Layout();
            layout.image_id = imageId;
            layout.gallery_id = $routeParams.galleryId;
            layout.$save(function () {
                $scope.loadLayouts();
            });
        };

        $scope.loadLayouts = function () {
            Gallery.get({galleryId: $routeParams.galleryId}, function (response) {
                console.log(response);
                $scope.gallery = response.gallery.Gallery;
                $scope.layouts = response.gallery.Layout;
            });
        };

        $scope.init = function () {
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
                $scope.images = response.files;

                // TODO: zrobić to ładniej / kręciołek
                setTimeout(function () {
                    $(".uploadedImages > div").draggable({
                        appendTo: "body",
                        helper: "clone"
                    });
                }, 1000);

            }, function (response) {
                console.log(response);
                // TODO: error
            });
        };


    }]);