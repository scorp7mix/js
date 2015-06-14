
// КЛАСС МАТРИЦЫ

function Matrix(containerId, rows, cols) {
    var self = this;

    var matrix;

    self.animationSpeed = 0;

    // создание сетки
    self.create = function () {
        matrix = $(containerId);
        var n = rows * cols;

        for (var i = 0; i < n; i++) {
            matrix.append('<div class="cell"/>');
        }
    };

    function getCellByPosition(obj) {
        var ind = (obj.x - 1) * cols + obj.y - 1;
        return matrix.find('div').eq(ind);
    }

    // получить значение ячейки
    self.getCell = function (obj) {
        var cell = getCellByPosition(obj);
        if (cell.hasClass('body')) {
            return 'body';
        } else if (cell.hasClass('food')) {
            return 'food';
        } else if (cell.hasClass('anti')) {
            return 'anti';
        } else {
                return 'none';
        }
    };

    // установить значение ячейки
    self.setCell = function (obj, val) {
        var cell = getCellByPosition(obj);
        switch (val) {
            case 'body':
                cell.attr('class', 'cell body');
                break;
            case 'food':
                cell.attr('class', 'cell food');
                self.growAnimate(obj, 'food');
                break;
            case 'anti':
                cell.attr('class', 'cell anti');
                self.growAnimate(obj, 'anti');
                break;
            case 'none':
                cell.attr('class', 'cell');
                break;
        }
    };

    // АНИМАЦИЯ
    self.growAnimate = function(obj, type) {
        var cell = getCellByPosition(obj);
        var pos = cell.position();
        var newCell = $('<div>');
        newCell.addClass('newCell').addClass(type);
        newCell.css({
            top: pos.top - 9.5,
            left: pos.left - 9.5
        });
        $("body").append(newCell);
        newCell.animate({height: 19, width: 19, top: pos.top, left: pos.left}, 500, function(){newCell.remove();});
    };

    self.dieAnimate = function(obj) {
        var cell = getCellByPosition(obj);
        var pos = cell.position();
        var newCell = $('<div>');
        newCell.addClass('deadCell');
        newCell.css({
            top: pos.top,
            left: pos.left - 5
        });
        $("body").append(newCell);
        newCell.toggle("explode");
        setTimeout(function() {newCell.remove()}, 1000);
    };

    self.clear = function() {
        matrix.find('div').remove();
    }
}
		
