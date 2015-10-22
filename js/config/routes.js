function routes($routeProvider) {
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
}
