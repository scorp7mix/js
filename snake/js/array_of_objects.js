// КЛАСС МАССИВА ОБЪЕКТОВ

function ArrayOfObjects(matrix, size, type) {

    var objects = [];

    var self = this;

    self.size = size;

    // ПРИВАТНЫЕ ФУНКЦИИ

    // нахождение случайного целого в интервале
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // нахождение индекса объекта в массиве
    function findIndex(obj) {
        for (var i = 0; i < objects.length; i++) {
            if ((obj.x == objects[i].x) && (obj.y == objects[i].y)) {
                return i;
            }
        }
    }

    // поиск незанятого объекта для элемента массива
    function findUniqueObj(ind) {
        do {
            objects[ind] = {x: randomInt(1, 20), y: randomInt(1, 20)};
        }
        while (matrix.getCell(objects[ind]) != 'none');
        matrix.setCell(objects[ind], type);
    }

    // ПУБЛИЧНЫЕ МЕТОДЫ

    // создание
    self.create = function () {
        for (var i = 0; i < self.size; i++) {
            findUniqueObj(i);
        }
    };

    // замена элемента массива новым
    self.replaceObj = function(old) {
        findUniqueObj(findIndex(old));
    };

    self.clear = function() {
        objects = [];
    }

}