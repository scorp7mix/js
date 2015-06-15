// КЛАСС ЗМЕЯ

function Snake(matrix) {

    var self = this;

    var body = [];      // массив объектов для тела змея

    var courseToData = {
        "left to left": {head: "head-left", body: "body-horizontal", tail: "tail-left"},
        "left to up": {head: "head-up", body: "body-right-up", tail: "tail-up"},
        "left to down": {head: "head-down", body: "body-right-down", tail: "tail-down"},
        "up to up": {head: "head-up", body: "body-vertical", tail: "tail-up"},
        "up to left": {head: "head-left", body: "body-left-down", tail: "tail-left"},
        "up to right": {head: "head-right", body: "body-right-down", tail: "tail-right"},
        "right to right": {head: "head-right", body: "body-horizontal", tail: "tail-right"},
        "right to up": {head: "head-up", body: "body-left-up", tail: "tail-up"},
        "right to down": {head: "head-down", body: "body-left-down", tail: "tail-down"},
        "down to down": {head: "head-down", body: "body-vertical", tail: "tail-down"},
        "down to left": {head: "head-left", body: "body-left-up", tail: "tail-left"},
        "down to right": {head: "head-right", body: "body-right-up", tail: "tail-right"}
    };

    // ПУБЛИЧНЫЕ МЕТОДЫ

    // создание
    self.create = function () {
        self.addHead({x: 1, y: 1}, "right to right");
        self.addHead({x: 1, y: 2}, "right to right");
    };

    self.addHead = function(obj, courseChange) {
        body.unshift({x: obj.x, y: obj.y});
        matrix.setCell(obj, 'body', 'head', courseToData[courseChange]);
        if(body.length > 1) matrix.setCell(body[1], 'body', 'body', courseToData[courseChange]);
        if(body.length == 2) matrix.setCell(body[1], 'body', 'tail');
    };

    self.deleteTail = function(pop) {
        pop = pop || false;
        var tail = pop ? body.pop() : {x: body[body.length - 1].x, y: body[body.length - 1].y};
        if(pop) matrix.setCell(body[body.length - 1], 'body', 'tail');
        matrix.setCell(tail, 'none');
    };

    self.getLength = function() {
        return body.length;
    };

    self.clear = function() {
        body = [];
    };
}