var galleryApp = angular.module('galleryApp', ['ngRoute', 'ngResource', 'ngStorage', /*'layoutsController',*/ 'layoutsService', 'authController',
    'galleriesController', 'galleriesService', 'authModalController' ,'adminController', 'angularFileUpload', 'filesService', 'ui.bootstrap']);

galleryApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html'
                }).
                when('/galleries', {
                    templateUrl: 'partials/gallery-list.html',
                    controller: 'galleriesCtrl'
                }).
                when('/galleries/:galleryId', {
                    templateUrl: 'partials/gallery.html',
                    controller: 'galleriesCtrl'
                }).
                when('/admin', {
                    templateUrl: 'partials/admin/index.html',
                    controller: 'adminCtrl'
                }).
                when('/admin/galleries/:galleryId', {
                    templateUrl: 'partials/admin/gallery.html',
                    controller: 'adminGalleryCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
    }]);

/*
galleryApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);
*/

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

angular.module('galleryApp').controller('ModalDemoCtrl', function ($scope, $modal, $log) {


});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
/*
angular.module('galleryApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});
*/

galleryApp.directive('fillWithImage', function(){
    return function(scope, element, attrs){
        var url = attrs.fillWithImage;
        url = url.replace(/\\/g, "/");
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});
