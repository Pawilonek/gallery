
var galleryApp = angular.module('galleryApp', ['ngRoute', 'ngResource', /*'layoutsController',*/ 'layoutsService', 'authenticationsController', 'authenticationsService',
    'galleriesController', 'galleriesService', 'adminController', 'angularFileUpload', 'filesService']);

galleryApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
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
                    redirectTo: '/galleries'
                });
    }]);



var apiUrl = '/gallery-api/';
var userHash = null;

function a() {
    $(".image").draggable({
        containment: "parent",
        scroll: false,
        grid: [100, 100],
        stop: function (e, ui) {
            console.log(ui.position);
        }
    }).resizable({
        containment: "#gallery",
        handles: "all",
        grid: [100, 100],
        stop: function (e, ui) {
            console.log(ui.size);
        }
    });
}
/*
 $( document ).ready(function() {
 var a = $("#aaa");
 a.append($(window).height()+"x");
 a.append($(window).width()+" ");
 a.append($(document).height()+"x");
 a.append($(document).width());
 });
 */