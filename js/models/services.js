angular.module('layoutsService', ['ngResource']).factory('Layout', ['$resource',
    function ($resource) {
        var layouts = $resource(config.apiUrl + 'layouts/:id.json', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
        layouts.prototype.save = function (response, errorResponse) {
            if (this.id) {
                return this.$update(response, errorResponse);
            } else {
                return this.$save(response, errorResponse);
            }
        };
        return layouts;
    }
]);

angular.module('galleriesService', ['ngResource']).factory('Gallery', ['$resource',
    function ($resource) {
        var galleries = $resource(config.apiUrl + 'galleries/:id.json', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
        galleries.prototype.save = function (response, errorResponse) {
            if (this.id) {
                return this.$update(response, errorResponse);
            } else {
                return this.$save(response, errorResponse);
            }
        };
        return galleries;
    }
]);

var pagesService = angular.module('pagesService', ['ngResource']);
pagesService.factory('Page', ['$resource',
    function ($resource) {
        var pages = $resource(config.apiUrl + 'pages/:id.json', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
        pages.prototype.save = function () {
            if (this.id) {
                return this.$update();
            } else {
                return this.$save();
            }
        };
        return pages;
    }
]);

var filesService = angular.module('filesService', ['ngResource']);
filesService.factory('File', ['$resource',
    function ($resource) {
        return $resource(config.apiUrl + 'images/:fileId.json', {fileId: ''}, {
            'update': {method: 'PUT'}
        });
    }]);