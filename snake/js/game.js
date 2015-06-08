// КЛАСС ИГРЫ

function Game(contentId, rows, cols, foodCount, antiCount) {
    var self = this;

    rows = rows || 20;
    cols = cols || 20;
    foodCount = foodCount || 5;
    antiCount = antiCount || 2;

    var matrix;
    var head;           // текущее положение головы
    var snake;          // экземпляр класса объектов для тела змея
    var food;           // экземпляр класса объектов для еды
    var anti;           // экземпляр класса объектов для анти-еды
    self.score = 0;

    var course = 'right';
    var prevCourse;
    var antiCourses = {
        'left': 'right',
        'up': 'down',
        'right': 'left',
        'down': 'up'
    };

    var gameTimer;
    var pause;

    var alerts = $('#alerts');

    var minScore = 0;

    // ПРИВАТНЫЕ ФУНКЦИИ

    // вывод ошибки при ajax запросе
    function ajaxErr(XMLHttpRequest) {
        $('.container table').empty().html('<p>' +
            '<b style="color: red;">Сервер данных не отвечает!' +
            '<br>Ошибка: ' + XMLHttpRequest.status +
            '<br>Статус: ' + XMLHttpRequest.statusText + '</b></p>');
    }

    // вывод ошибки при убийстве об стену
    function errBlock() {
        alerts.html("змей убился об стену :(.. <b>конец игры</b>");
        matrix.dieAnimate(head);
        gameOver();
    }

    // остановка игры
    function gameOver() {
        clearInterval(gameTimer);
        $('#title').fadeIn(2000);
        if(snake.getLength() > minScore) {
            $('#save-score').css("display", "block");
            $('#save-score-name').focus();
        } else {
            $('#start-btn').focus();
        }
    }

    // изменение скорости игры
    function setGameSpeed(newSpeed) {
        clearInterval(gameTimer);
        if(newSpeed != 0) {
            matrix.animationSpeed = newSpeed;
            gameTimer = setInterval(gameplay, newSpeed);
        }
    }

    // главная
    function gameplay() {

        course = course == antiCourses[prevCourse] ? prevCourse : course;

        switch (course) {
            case 'left': if (head.y == 1) {errBlock(); return;} else {head.y--;} break;
            case 'up': if (head.x == 1) {errBlock(); return;} else {head.x--;} break;
            case 'right': if (head.y == cols) {errBlock(); return;} else {head.y++;} break;
            case 'down': if (head.x == rows) {errBlock(); return;} else {head.x++;} break;
        }

        prevCourse = course;

        var turn = matrix.getCell(head);

        // проверка текущего хода
        switch(turn) {
            case 'body':
                alerts.html("съел сам себя :(.. <b>конец игры</b>");
                matrix.dieAnimate(head);
                gameOver();
                return;
            case 'food':
                matrix.growAnimate(head, 'body-green');
                food.replaceObj(head);
                break;
            case 'anti':
                matrix.growAnimate(head, 'body-red');
                anti.replaceObj(head);
                snake.deleteTail(true);
                if(snake.getLength() > 0) snake.deleteTail(true);
                break;
            default:
                snake.deleteTail(true);
                break;
        }

        snake.addHead(head);

        $('#length').html("Длина змея: " + snake.getLength());
        self.score = snake.getLength();
        setGameSpeed(300 - snake.getLength() * 3);

        if(snake.getLength() + food.size + anti.size == rows * cols) {
            alerts.html('ПОБЕДА!!!');
            gameOver();
        }
    }

    // ПУБЛИЧНЫЕ МЕТОДЫ

    // создание
    self.create = function () {
        matrix = new Matrix(contentId, rows, cols);
        matrix.create();

        head = {x: 1, y: 1};
        matrix.setCell(head, 'body');

        snake = new Snake(matrix);
        snake.create();
        food = new ArrayOfObjects(matrix, foodCount, 'food');
        food.create();
        anti = new ArrayOfObjects(matrix, antiCount, 'anti');
        anti.create();

        setGameSpeed(300);
    };

    // смена направления движения
    self.setCourse = function (newCourse) {
        course = newCourse;
    };

    // постановка/снятие паузы
    self.togglePause = function () {
        if(!pause) {
            setGameSpeed(0);
            alerts.html("Игра на паузе");
        } else {
            setGameSpeed(speed);
            alerts.empty();
        }
        pause = !pause;
    };

    // обновление рекордов
    self.scoresRefresh = function(candidate) {
        var data = candidate ? "name=" + candidate.name + "&score=" + candidate.score : '';
        $.ajax("./ajax/records.php", {
                type: "POST",
                data: data,
                success: function (data) {
                    $('.container table').empty().html(data);
                },
                error: ajaxErr
            }
        );
        $.ajax("./ajax/records.php", {
                type: "POST",
                data: "min=true",
                success: function (data) {
                    minScore = Number(data);
                },
                error: ajaxErr
            }
        );
    };

/*
*
* Функция пересчета рекордов перемещена на сторону "сервера"
*
        candidate = candidate || {name: '', score: 0};
        scores.reduce(function(pv, cur, ind, arr) {
            if(cur.score < pv.score) {
                var t = {name: cur.name, score: cur.score};
                arr[ind].name = pv.name;
                arr[ind].score = pv.score;
                return t;
            } else {
                return pv;
            }
        }, candidate);

        for(var i = 0; i < 5; i++) {
            var tdInRow = $('.container table tr').eq(i).find('td');
            tdInRow.eq(1).html(scores[i].name);
            tdInRow.eq(2).html(scores[i].score);
            if(i == 4) minScore = scores[i].score;
        }
*/

    // обновление игрового поля
    self.reset = function(foodCount, antiCount) {

        anti.clear();
        food.clear();
        snake.clear();
        matrix.clear();

        food.size = foodCount;
        anti.size = antiCount;

        course = 'right';
        prevCourse = '';
        pause = false;

        matrix.create();

        head = {x: 1, y: 1};
        matrix.setCell(head, 'body');

        snake.create();
        food.create();
        anti.create();

        setGameSpeed(300);
    };
}