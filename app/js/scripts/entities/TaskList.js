function TaskList(taskList, startId) {
    this._taskList = taskList;
    if (startId) {
        this._idCounter = startId;
    } else {
        this._idCounter = 0;
    }
}

TaskList.prototype.add = function (title, owner, assignee) {
    var id = this._idCounter++;
    var task = new Task(id, new Date(), title, owner, assignee, false);
    this._taskList.push(task);
    return task;
};

TaskList.prototype.update = function (task) {
    for (var i = 0; i < this._taskList.length; i++) {
        if (this._taskList[i].toJSON().id == task.toJSON().id) {
            this._taskList[i] = task;
            return;
        }
    }
};

TaskList.prototype.remove = function (id) {
    for (var i = 0; i < this._taskList.length; i++) {
        var task = this._taskList[i];
        if (task.toJSON().id == id) {
            task = null;
            this._taskList.splice(i, 1);
        }
    }
};

TaskList.prototype.find = function (id) {
    for (var i = 0; i < this._taskList.length; i++) {
        var task = this._taskList[i];
        if (task.toJSON().id == id) {
            return task;
        }
    }
};

TaskList.prototype.printToLog = function () {
    for (var i = 0; i < this._taskList.length; i++) {
        var task = this._taskList[i];
        console.log(JSON.stringify(task.toJSON()));
    }
};

TaskList.prototype.list = function () {
    return this._taskList.sort(function (task1, task2) {
        var jsonTask1 = task1.toJSON();
        var jsonTask2 = task2.toJSON();
        var date = jsonTask1.date.getTime() - jsonTask2.date.getTime();
        if (jsonTask1.isComplete && !jsonTask2.isComplete) {
            return +1;
        }
        if (!jsonTask1.isComplete && jsonTask2.isComplete) {
            return -1;
        }
        return date;
    });
};

TaskList.prototype.toJSON = function () {
    var list = [];
    var sortedList = this.list();
    for (var i = 0; i < this._taskList.length; i++) {
        list.push(sortedList[i].toJSON());
    }
    return list;
};

TaskList.fromJSON = function (json) {
    var maxId = 0;
    var list = [];
    for (var i = 0; i < json.length; i++) {
        var task = Task.fromJSON(json[i]);
        list.push(task);
        if (maxId < task._id) {
            maxId = task._id;
        }
    }
    return new TaskList(list, maxId + 1);
};








