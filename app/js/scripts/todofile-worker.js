self.addEventListener('message', function (e) {
    importScripts('entities/Task.js');
    importScripts('entities/TaskList.js');
    importScripts('entities/User.js');
    var csvFile = e.data.message;
    var lines = csvFile.split(/\r\n|\n/);
    var taskList = [];
    for (var i = 0; i < lines.length; i++) {
        var fields = lines[i].split(";");
        var id = fields[0];
        var date = new Date(fields[4]);
        var title = fields[3];
        var owner = new User(fields[1]);
        var assignee = new User(fields[2]);
        var isComplete = fields[5] == 'true';
        taskList.push(new Task(id, date, title, owner, assignee, isComplete));
    }
    taskList = new TaskList(taskList);
    self.postMessage(taskList.toJSON());
    self.close();
}, false);