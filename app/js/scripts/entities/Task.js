function Task(id, date, title, owner, assignee, isComplete) {
    this._title = title;
    this._date = date;
    this._completed = isComplete;
    this._assignee = assignee;
    this._owner = owner;
    this._id = id;

}

Task.prototype.removeAssignee = function () {
    this._assignee = null;
};

Task.prototype.assign = function (assignee) {
    this._assignee = assignee;
};

Task.prototype.reassign = function (assignee) {
    this._assignee = assignee;
};

Task.prototype.completeTask = function () {
    this._completed = true;
};

Task.prototype.reopen = function () {
    this._completed = false;
};

Task.prototype.rename = function (title) {
    this._title = title;
};

Task.prototype.toJSON = function () {
    return {
        title: this._title,
        owner: this._owner.toJSON(),
        assignee: this._assignee.toJSON(),
        date: this._date,
        id: this._id,
        completed: this._completed
    }
};

Task.fromJSON = function (json) {
    return new Task(
        json.id, new Date(json.date), json.title,
        User.fromJSON(json.owner), User.fromJSON(json.assignee),
        json.completed);
};





