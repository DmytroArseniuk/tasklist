angular.module('tasks-back', []).
    factory('Widget', function () {
        var user = new User("Dmytro");
        var taskList = new TaskList([]);
        return {
            taskList : taskList,
            user: user
        };
    });