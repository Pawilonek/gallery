var layoutsService = angular.module('layoutsService', ['ngResource']);
layoutsService.factory('Layout', ['$resource',
    function ($resource) {
        return $resource(apiUrl + 'layouts/:layoutId.json', {layoutId: ''}, {
            'update': { method:'PUT' }
        });
    }]);

var galleriesService = angular.module('galleriesService', ['ngResource']);
galleriesService.factory('Gallery', ['$resource',
    function ($resource) {
        var galleries = $resource(apiUrl + 'galleries/:id.json', {id: '@id' }, {
            'update': { method:'PUT' }
        });

        galleries.prototype.save = function() {
            if (this.id) {
                return this.$update();
            } else {
                return this.$save();
            }
        };
        return galleries;
    }]);

var filesService = angular.module('filesService', ['ngResource']);
filesService.factory('File', ['$resource',
    function ($resource) {
        return $resource(apiUrl + 'images/:fileId.json', {fileId: ''}, {
            'update': { method:'PUT' }
        });
    }]);