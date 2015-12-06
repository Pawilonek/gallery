angular.module('pagesController', []).controller('pagesCtrl',
    function ($scope, $rootScope, $sce, Page, $routeParams) {

        // Editor options.
        $scope.options = {
            language: 'pl',
            allowedContent: true,
            entities: false
        };

        $scope.page = null;
        $scope.pages = [];

        $scope.loadPages = function () {
            Page.get(function (response) {
                $scope.pages = response.pages;
            }, function (response) {
                // TODO: error
                console.log(response);
            })
        };

        $scope.init = function () {
            $scope.loadPage();
        };

        $scope.savePage = function () {
            if (!$scope.page) {
                return;
            }

            var page = new Page();
            page.id = $scope.page.id;
            page.body = $scope.page.body;
            page.save();
        };

        $scope.$watch('page.body', function (newValue, oldValue) {
            $scope.contentSafe = $sce.trustAsHtml(newValue);
        });

        $scope.loadPage = function () {
            Page.get({id: $routeParams.pageId}, function (response) {
                var page = response.page;
                $scope.page = page;
                $scope.contentSafe = $sce.trustAsHtml(page.body);
            }, function (response) {
                // TODO: error
                console.log(response);
            });
        };

    }
);
