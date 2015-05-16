function User(name) {
    this._name = name;
}

User.prototype.toJSON = function () {
    return {
        name: this._name
    };
};