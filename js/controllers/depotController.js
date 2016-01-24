angular.module('depotController', []).controller('depotCtrl',
    function ($scope, $rootScope, $location, FileUploader, File) {

        $scope.init = function () {
            if ($rootScope.authToken == null) {
                $location.path("/");
                return false;
            }

            $scope.loadImages();
        };

        var uploader = $scope.uploader = new FileUploader({
            url: config.apiUrl + 'images.json',
            method: 'POST',
            headers: {
                Authorization: $rootScope.authToken
            }
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // uruchomienie wysyłania pliku odrazu po jego dodaniu
        uploader.onAfterAddingFile = function (fileItem) {
            fileItem.upload();
        };

        $scope.loadImages = function () {
            File.get(function (response) {
                $scope.images = response.images;
            }, function (response) {

            });
        };
    }
);

