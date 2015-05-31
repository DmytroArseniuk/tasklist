angular.module('tasks-front', ['tasks-back'])
    .controller('widgetController', ['$scope', '$state', 'Widget', function ($scope, $state, Widget) {

        $scope.editableTaskId = null;
        $scope.focused = false;
        $scope.file = null;
        $scope.assignee = Widget.user.toJSON().name;
        $scope.taskOwner = Widget.user.toJSON().name;
        $scope.tasks = Widget.taskList.toJSON();

        $scope.addTask = function () {
            Widget.taskList.add($scope.description, Widget.user, new User($scope.assignee));
            Widget.taskList.printToLog();
            $scope.tasks = Widget.taskList.toJSON();
            $scope.description = "";
        };

        $scope.uploadFromFile = function () {
            $.work({file: 'js/scripts/todofile-worker.js', args: {message: $scope.file}}).then(function (data) {
                Widget.taskList = TaskList.fromJSON(data);
                setTimeout(function () {
                    $scope.tasks = Widget.taskList.toJSON();
                }, 0);
            }).fail(function (data) {
                console.log(data);
            });
        };

        $scope.editTask = function (taskId, title, assignee) {
            var task = Widget.taskList.find(taskId);
            task.rename(title);
            if (assignee == "") {
                task.removeAssignee();
            } else {
                task.assign(new User(assignee));
            }
            Widget.taskList.update(task);
            $scope.tasks = Widget.taskList.toJSON();
        };

        $scope.completeTask = function (taskId) {
            var task = Widget.taskList.find(taskId);
            task.completeTask();
            Widget.taskList.update(task);
            $scope.tasks = Widget.taskList.toJSON();
        };

        $scope.reopenTask = function (taskId) {
            var task = Widget.taskList.find(taskId);
            task.reopen();
            Widget.taskList.update(task);
            $scope.tasks = Widget.taskList.toJSON();

        };

        $scope.deleteTask = function (taskId) {
            Widget.taskList.remove(taskId);
            $scope.tasks = Widget.taskList.toJSON();
        };

        $scope.setEditableTask = function (taskId) {
            $scope.editableTaskId = taskId;
        };

        $scope.clearEditableTask = function () {
            if ($scope.focused == null) {
                $scope.editableTaskId = null;
            }
        };

        $scope.clearFocus = function () {

            $scope.focused = null;
        };
        $state.transitionTo('tasks.my');
    }])
    .controller('listItemController', ['$scope', '$state', function ($scope, $state) {
        if ($state.is('tasks.my')) {
            $scope.owner = function (task) {
                return task.assignee.name == $scope.$parent.taskOwner
                    && task.owner.name == $scope.$parent.taskOwner;
            };
        } else if ($state.is('tasks.all')) {
            $scope.$parent.taskOwner = "all";
            $scope.owner = function () {
                return true;
            };
        }
    }])
    .directive('nameLength', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {

                //For DOM -> model validation
                ngModel.$parsers.unshift(function (value) {
                    var valid = value.length > 0 && value.length < 15;
                    ngModel.$setValidity('nameLength', valid);
                    return valid ? value : undefined;
                });
            }
        };
    }).directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsText(changeEvent.target.files[0]);
                });
            }
        }
    }]);
