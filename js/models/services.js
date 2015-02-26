var layoutsService = angular.module('layoutsService', ['ngResource']);
layoutsService.factory('Layout', ['$resource',
    function ($resource) {
        return $resource(apiUrl + 'layouts/:layoutId.json', {layoutId: ''}, {
            'update': { method:'PUT' }
        });
    }]);

var authenticationsService = angular.module('authenticationsService', ['ngResource']);
authenticationsService.factory('Authentication', ['$resource',
    function ($resource) {
        return $resource(apiUrl + 'authentications/:hashId.json', {hashId: ''}, {
            'update': { method:'PUT' }
        });
    }]);

var galleriesService = angular.module('galleriesService', ['ngResource']);
galleriesService.factory('Gallery', ['$resource',
    function ($resource) {
        return $resource(apiUrl + 'galleries/:galleryId.json', {galleryId: ''}, {
            'update': { method:'PUT' }
        });
    }]);

var filesService = angular.module('filesService', ['ngResource']);
filesService.factory('File', ['$resource',
    function ($resource) {
        return $resource(apiUrl + 'files/:fileId.json', {fileId: ''}, {
            'update': { method:'PUT' }
        });
    }]);