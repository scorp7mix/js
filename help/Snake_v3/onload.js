//
// Entering
//
$(document).ready(function() {
	var m1 = new Matrix('matrix1', 10, 10);
	m1.create();

	var snake = new Snake(1, 1, 'right', 3);
    snake.create();

    var point = Food(m1);
    var startGame;

    var dif = 1;
    $('#slider').slider({
        min: 1,
        max: 3,
        animate: 'slow',
        stop:function(event, ui) {
            dif = ui.value;
        }
    });

    gamePlay = function (onOff) {
        if (onOff == true) {
            if (dif == 1) var speed = 500;
            if (dif == 2) var speed = 200;
            if (dif == 3) var speed = 100;
            startGame = setInterval(snake.move, speed);
        }
        else if (onOff == false) {
            clearInterval(startGame);
        }
    };

    gamePlay(true);

    $('#start').button().click(function(){
        window.location.reload();
    });

    $('#pause').button().click(function(){
        gamePlay(false);
    });

    $('#resume').button().click(function(){
        gamePlay(true);
    });

    var pause = false;
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var BOTTOM = 40;

    $(document).bind('keydown', function(e) {
        var key = e.keyCode;
        switch(key) {
            case LEFT:
            snake.course = 'left';
            break;
            case UP:
            snake.course = 'top';
            break;
            case RIGHT:
            snake.course = 'right';
            break;
            case BOTTOM:
            snake.course = 'bottom';
            break;
            case 32:
                pause ? gamePlay(true) : gamePlay(false);
                pause = !pause;break;
        }
    });
});