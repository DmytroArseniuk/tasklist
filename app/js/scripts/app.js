angular.module('app', [
    'ui.router',
    'formatters',
    'tasks-front'
])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('tasks', {
                url: "/",
                templateUrl: "views/widget.html"
            })
            .state('tasks.my', {
                url: "my",
                templateUrl: "views/task-list.html"
            })
            .state('tasks.all', {
                url: "all",
                templateUrl: "views/task-list.html"
            })
    });

