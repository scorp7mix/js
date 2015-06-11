function Snake(row, col, course, length) {
	this.course = course;
	var that = this;
	var snake = [];

    var foods = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i = 1; i < length; i++) {
        snake.push({x: row + i, y: col});
        }

	this.create = function() {
        var tail = snake[snake.length - 1];
        snake.push(tail);
	};

	this.move = function() {
        console.log('move');
        var eat = false;
        var head = {};
        head.x = snake[0].x;
        head.y = snake[0].y;

        switch(that.course) {
            case 'right':
                head.y = snake[0].y+1;
                break;
            case 'left':
                head.y = snake[0].y-1;
                break;
            case 'top':
                head.x = snake[0].x-1;
                break;
            case 'bottom':
                head.x = snake[0].x+1;
                break;
        }

        // Checking outgoing from field and selfeating
        if ((head.x < 1 || head.x > matrix.rows) ||
        	(head.y < 1 || head.y > matrix.rows) ||
        	(matrix.getCell(head.x, head.y, "snake"))) {

            // Setting result text for GameOver window
            var resText;
            var yourRes = 0;
            for (var n = 1; n < 17; n++) {
                yourRes = yourRes + foods[n];
            }

            if (yourRes <= 10) resText = 'I beleive you can better.';
            if (yourRes > 10 && yourRes <= 20) resText = 'It seams you was hungry. :)';
            if (yourRes > 20) resText = 'Very good result! Congratulations!';
/*

            //Animating snake death
            $('.snake').effect('explode', {}, 400);

            //Showing GameOver window
            $('#gameover').dialog( {
                show: {
                    effect: "blind",
                    duration: 400
                },
                hide: {
                    effect: "explode",
                    duration: 400
                },
                buttons: {
                    "Try again" : function() {
                        $('#gameover').dialog('close');
                        window.location.reload();
                    }
                },
                height: 220,
                modal: true
            }).html('<center>You eated <b>' + yourRes + '</b> fruits. <br />'
            + resText + '<br />Try again!</center>');

*/
        //Stop game
        gamePlay(false);
return;
        }

        //that.setSnake(snake, false, matrix);

        // Adding head
        snake.unshift(head);

        for (var i = 0; i < snake.length; i++) {
            var row = snake[i].x;
            var col = snake[i].y;
            if (matrix.getCell(row, col, "food")) {

                //showing results about food
                var randFood = $('.food').css('background-image').replace('"','');
                randFood = randFood.substr(-7, 2);

                if (randFood[0] == '/') {
                    randFood = parseInt(randFood[1]);
                } else {
                    randFood = parseInt(randFood);
                }

                if (randFood) {
                    var id = '#' + randFood;
                    ++foods[randFood];
                    $(id).text(foods[randFood]);
                }

                eat = true;
                var food = new Food(matrix);
                break;
            }
        }

        that.setSnake(snake, false, matrix);

        // Deleting tail
        if (!eat) snake.pop();
        that.setSnake(snake, true, matrix);
    };

    this.setSnake = function(arr, val, matrix) {
        this.matrix = matrix;
        this.arr = arr;
        this.val = val;
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i].x;
            var col = arr[i].y;
            matrix.setCell(row, col, val);
        }
    }
}

// For coping body of snake
function cloneArray(arr) {
  var result = [];
  arr.forEach(function(value) {
    var arrElem = {};
    for (var prop in value)
      arrElem[prop] = value[prop];
    result.push(arrElem);
  });
  return result;
}