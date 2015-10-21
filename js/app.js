var galleryApp = angular.module('galleryApp', ['ngRoute', 'ngResource', 'ngStorage', /*'layoutsController',*/ 'layoutsService', 'authController',
    'galleriesController', 'galleriesService', 'authModalController', 'adminController', 'angularFileUpload', 'filesService', 'ui.bootstrap',
    'ckeditor', 'pagesController', 'pagesService']);

galleryApp.config(function ($routeProvider) {
    $routeProvider
        .when('/page/:pageId/:pageSlug', {
            templateUrl: 'partials/pages.html',
            controller: 'pagesCtrl'
        })
        .when('/galleries', {
            templateUrl: 'partials/gallery-list.html',
            controller: 'galleriesCtrl'
        })
        .when('/galleries/:galleryId/:gallerySlug', {
            templateUrl: 'partials/gallery.html',
            controller: 'galleriesCtrl'
        })
        .when('/admin', {
            templateUrl: 'partials/admin/index.html',
            controller: 'adminCtrl'
        })
        .when('/admin/galleries/:galleryId', {
            templateUrl: 'partials/admin/gallery.html',
            controller: 'adminGalleryCtrl'
        })
        .otherwise({
            redirectTo: '/page/1/home'
        });
});




var apiUrl = 'http://api.gallery.local/';
var userHash = null;

angular.module('galleryApp').controller('AlertCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.alerts = [];

    $scope.addAlert = function () {
        $scope.$broadcast('alert', {type: 'success', msg: 'test!!'});
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $rootScope.$on("alert", function (event, param) {
        $scope.alerts.push(param);
    });
}]);

galleryApp.directive('fillWithImage', function () {
    return function (scope, element, attrs) {
        var url = attrs.fillWithImage;
        url = url.replace(/\\/g, "/");
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    };
});

galleryApp.directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element, attr) {
            attr.$observe('focusMe', function (value) {
                if (value === "true") {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
});

jQuery(document).ready(function ($) {
    $('body').on('click', '.navbar-collapse a', function () {
        $(".navbar-collapse").collapse('hide');
    });
});
