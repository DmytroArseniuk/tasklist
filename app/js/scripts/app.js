angular.module('app', ['tasks-back'])
    .controller('main-controller', function ($scope, Widget) {
        var taskTitleChangeListener = function (textArea, button) {
            textArea.on("keyup", action);
            textArea.on("change", action);

            function action() {
                if (jQuery.trim(textArea.val()) == '') {
                    button.attr("disabled", true);
                } else {
                    button.prop("disabled", false);
                }
            }
        };

        var setTaskEvents = function (taskId) {
            var taskContainer = $('#taskId_' + taskId);
            var completeButton = taskContainer.find(".complete");
            var reopenButton = taskContainer.find(".reopen");
            var deleteButton = taskContainer.find(".delete");
            var saveButton = taskContainer.find(".save");
            var titleEditText = taskContainer.find(".taskEditText");
            var titleTextView = taskContainer.find(".taskTextView");
            var date = taskContainer.find(".date");
            var taskActionContainer = taskContainer.find(".taskActions");

            taskTitleChangeListener(titleEditText, saveButton);

            var isMouseLeave = true;
            $(taskContainer).on('mouseenter', function (e) {
                console.log("mouseenter");
                taskActionContainer.css('display', 'block');
                if (!titleTextView.hasClass('CompletedTask')) {
                    titleTextView.css('display', 'none');
                    titleEditText.css('display', 'block');
                }
                isMouseLeave = false;
            });
            function showRegularTask() {
                taskActionContainer.css('display', 'none');
                titleTextView.css('display', 'block');
                titleEditText.css('display', 'none');
                titleEditText.val(taskView.titleTextView.text());
                saveButton.prop("disabled", false);
            }

            $(taskContainer).on('mouseleave', function (e) {
                isMouseLeave = true;
                if (!titleEditText.is(':focus')) {
                    showRegularTask();
                }
            });
            $(titleEditText).on('focusout', function (e) {
                if (isMouseLeave) {
                    showRegularTask();
                }
            });
            $(saveButton).on('click', function (e) {

            });
            $(completeButton).on('click', function (e) {

            });
            $(reopenButton).on('click', function (e) {

            });
            $(deleteButton).on('click', function (e) {

            });
        };

        $scope.addTask = function () {
            var task = Widget.taskList.add($scope.description, Widget.user, Widget.user);
            Widget.taskList.printToLog();
            $scope.tasks = Widget.taskList.toJSON();
            $scope.description = "";
            setTaskEvents(task.toJSON().id);
        };
    });
