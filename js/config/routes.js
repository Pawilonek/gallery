function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/pages/home.html',
        })
        .when('/page/:pageId/:pageSlug', {
            templateUrl: 'partials/pages/pages.html',
            controller: 'pagesCtrl'
        })
        .when('/galleries', {
            templateUrl: 'partials/pages/gallery-list.html',
            controller: 'galleriesCtrl'
        })
        .when('/galleries/:galleryId/:gallerySlug', {
            templateUrl: 'partials/pages/gallery.html',
            controller: 'galleriesCtrl'
        })
        .when('/admin', {
            templateUrl: 'partials/pages/admin/index.html',
            controller: 'adminCtrl'
        })
        .when('/admin/galleries/:galleryId', {
            templateUrl: 'partials/pages/admin/gallery.html',
            controller: 'adminGalleryCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}
