var galleryApp = angular.module('galleryApp', ['ngRoute', 'ngResource', 'ngStorage', /*'layoutsController',*/ 'layoutsService', 'authController',
    'galleriesController', 'galleriesService', 'authModalController', 'adminController', 'angularFileUpload', 'filesService', 'ui.bootstrap',
    'ckeditor', 'pagesController', 'pagesService']);

galleryApp.config(routes);

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
    return function (scope, element, attr) {
        attr.$observe('focusMe', function (value) {
            if (value === "true") {
                $timeout(function () {
                    element[0].focus();
                });
            }
        });
    };
});

jQuery(document).ready(function ($) {
    var $body = $('body');
    // Ukrywanie menu po przejściu na inną podstronę (widok mobilny)
    $body.on('click', '.navbar-collapse a', function () {
        $(".navbar-collapse").collapse('hide');
    });
    // pozbycie się efektu :hover po kliknięciu na elementy menu
    $body.on('mouseup', 'a', function () {
        $(this).blur();
    });
});
