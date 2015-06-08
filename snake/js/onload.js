// объект игры
var game;

// коллекция кодов используемых клавиш
var keyCodes = {
    'KEY_LEFT': 37,
    'KEY_UP': 38,
    'KEY_RIGHT': 39,
    'KEY_DOWN': 40,
    'SPACE': 32
};

// обработчик нажатия клавиш
function checkKeyDown(e) {
    if(!game) return;
    switch (e.keyCode) {
        case keyCodes['KEY_LEFT']:
            game.setCourse('left');
            break;
        case keyCodes['KEY_UP']:
            game.setCourse('up');
            break;
        case keyCodes['KEY_RIGHT']:
            game.setCourse('right');
            break;
        case keyCodes['KEY_DOWN']:
            game.setCourse('down');
            break;
        case keyCodes['SPACE']:
            game.togglePause();
            break;
    }
}

// точка входа
$(document).ready(function () {

    $("#title").fadeOut(0);

    $(document).on("keydown", checkKeyDown);

    $('#start-btn').on('click', function() {
        if(game) {
            game.reset($('#food-count').val(), $('#anti-count').val());
        } else {
            game = new Game('#matrix1', 20, 20, $('#food-count').val(), $('#anti-count').val());
            game.create();
        }

        game.scoresRefresh();

        $("#title").fadeOut(0);
        $("#alerts, #length").empty();

        $(this).blur();
        $('#save-score').css("display","none");
    }).focus();

    $('#save-score-btn').on('click', function() {
        game.scoresRefresh({name: $('#save-score-name').val(), score: game.score});
        $(this).blur();
        $('#save-score').css("display","none");
        $('#start-btn').focus();
    })
});