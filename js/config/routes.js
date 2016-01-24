function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/pages/home.html'
        })
        .when('/page/:pageId/:pageSlug', {
            templateUrl: 'html/pages/pages.html',
            controller: 'pagesCtrl'
        })
        .when('/galleries', {
            templateUrl: 'html/pages/gallery-list.html',
            controller: 'galleriesCtrl'
        })
        .when('/galleries/:galleryId/:gallerySlug', {
            templateUrl: 'html/pages/gallery.html',
            controller: 'galleriesCtrl'
        })
        .when('/depot', {
            templateUrl: 'html/pages/depot.html',
            controller: 'depotCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}
