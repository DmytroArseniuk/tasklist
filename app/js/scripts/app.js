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

$.work = function (args) {
    var def = $.Deferred(function (dfd) {
        var worker;
        if (window.Worker) {
            var worker = new Worker(args.file);
            worker.onmessage = function (event) {
                dfd.resolve(event.data);
            };
            worker.onerror = function (event) {
                dfd.reject(event);
            };
            worker.postMessage(args.args);
        } else {
            alert("Web workers not supported.");
        }
    });
    return def.promise();
};
