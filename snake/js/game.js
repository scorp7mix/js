// КЛАСС ИГРЫ

function Game(contentId, rows, cols, foodCount, antiCount, speed) {
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

    var course;
    var prevCourse;
    var antiCourses = {
        'left': 'right',
        'up': 'down',
        'right': 'left',
        'down': 'up'
    };

    var gameTimer;
    var pause;

    self.gameActive = false;

    var alerts = $('#alerts');

    // создание
    $.ajaxSetup({
        error: function ajaxErr(XMLHttpRequest) {
            $('.container table').empty().html('<p>' +
                '<b style="color: red;">Сервер данных не отвечает!' +
                '<br>Ошибка: ' + XMLHttpRequest.status +
                '<br>Статус: ' + XMLHttpRequest.statusText + '</b></p>');
        }
    });

    matrix = new Matrix(contentId, rows, cols);
    matrix.create();

    head = {x: 1, y: 2};
    //matrix.setCell(head, 'body');

    snake = new Snake(matrix);
    food = new ArrayOfObjects(matrix, foodCount, 'food');
    anti = new ArrayOfObjects(matrix, antiCount, 'anti');

    // ПРИВАТНЫЕ ФУНКЦИИ

    // вывод ошибки при убийстве об стену
    function errBlock() {
        alerts.html("змей убился об стену :(.. <b>конец игры</b>");
        matrix.dieAnimate(head);
        gameOver();
    }

    // учет набранных очков
    function changeScore(type) {
        if(type == 'food') self.score += (500 - speed);
        if(type == 'anti') self.score -= (speed * 2);
        if(self.score < 0) self.score = 0;
        $('#length').html("Результат: " + self.score);
    }

    // остановка игры
    function gameOver() {
        clearInterval(gameTimer);
        self.gameActive = false;

        $('#speed-slider').slider("enable");
        $('#title').css("visibility", "visible").fadeIn(2000);

        $('#save-score').dialog({
            autoOpen: false,
            width: 320,
            modal: true,
            buttons: {
                'Сохранить': function() {
                    self.scoresRefresh({
                        name: $('#save-score-name').val(),
                        score: self.score
                    });
                    $('#save-score').dialog("close");
                }
            },
            close: function() {
                $('#save-score').dialog("close");
            }
        }).dialog("open");
    }

    // установка скорости игры
    function setGameSpeed(newSpeed) {
        clearInterval(gameTimer);
        if(newSpeed != 0) {
            speed = newSpeed;
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

        var courseChange = prevCourse + ' to ' + course;

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
                changeScore('food');
                matrix.growAnimate(head, 'body-green');
                food.replaceObj(head);
                break;
            case 'anti':
                changeScore('anti');
                matrix.growAnimate(head, 'body-red');
                anti.replaceObj(head);
                snake.deleteTail(true);
                if(snake.getLength() > 1) snake.deleteTail(true);
                break;
            default:
                snake.deleteTail(true);
                break;
        }

        snake.addHead(head, courseChange);

        if(snake.getLength() + food.size + anti.size == rows * cols) {
            alerts.html('ПОБЕДА!!!');
            gameOver();
        }
    }

    // ПУБЛИЧНЫЕ МЕТОДЫ

    // смена направления движения
    self.setCourse = function (newCourse) {
        course = newCourse;
    };

    // постановка/снятие паузы
    self.togglePause = function () {
        if(!pause) {
            clearInterval(gameTimer);
            alerts.html("Игра на паузе");
            $('#speed-slider').slider("enable");
        } else {
            setGameSpeed(speed);
            alerts.empty();
            $('#speed-slider').slider("disable");
        }
        pause = !pause;
    };

    // обновление рекордов
    self.scoresRefresh = function(candidate) {
        var request = candidate ? {name: candidate.name, score: candidate.score} : '';
        $.post(
            "./ajax/records.php",
            request,
            function (data) {
                $('.container table').html(data);
            }
        );
    };

    // изменение скорости игры
    self.changeGameSpeed = function (newSpeed) {
        speed = newSpeed;
    };

    // обновление игрового поля
    self.reset = function(foodCount, antiCount) {

        anti.clear();
        food.clear();
        snake.clear();
        matrix.clear();

        food.size = foodCount;
        anti.size = antiCount;

        course = 'right';
        prevCourse = 'right';
        pause = false;
        self.gameActive = true;
        self.score = 0;

        matrix.create();

        head = {x: 1, y: 2};

        snake.create();
        food.create();
        anti.create();

        self.scoresRefresh();

        setGameSpeed(speed);
    };
}