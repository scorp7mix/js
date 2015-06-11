// КЛАСС ЗМЕЯ

function Snake(matrix) {

    var self = this;

    var body = [];      // массив объектов для тела змея

    // ПУБЛИЧНЫЕ МЕТОДЫ

    // создание
    self.create = function () {

        self.addHead({x: 1, y: 1});
    };

    self.addHead = function(obj) {
        body.unshift({x: obj.x, y: obj.y});
        matrix.setCell(obj, 'body');
    };

    self.deleteTail = function(pop) {
        pop = pop || false;
        var tail = pop ? body.pop() : {x: body[body.length - 1].x, y: body[body.length - 1].y};
        matrix.setCell(tail, 'none');
    };

    self.getLength = function() {
        return body.length;
    };

    self.clear = function() {
        body = [];
    };
}