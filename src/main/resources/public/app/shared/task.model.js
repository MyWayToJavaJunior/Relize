"use strict";
var Task = (function () {
    function Task(title, date, text) {
        this.title = title;
        this.done = false;
        this.text = text;
        this.date = date;
        this.id = 0;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.model.js.map