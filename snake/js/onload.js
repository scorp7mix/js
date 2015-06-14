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

    game = new Game('#matrix1', 20, 20, $('#food-count').val(), $('#anti-count').val(), $("#speed").val());
    game.scoresRefresh();

    $('#speed-slider').slider({
        value:300,
        min: 100,
        max: 500,
        step: 10,
        slide: function( event, ui ) {
            $("#speed").val(ui.value);
            game.changeGameSpeed($("#speed-slider").slider("value"));
        }
    });

    $('#start-btn').on('click', function() {
        $(document).on("keydown", checkKeyDown);
        $("#speed-slider").slider("disable");

        game.reset($('#food-count').val(), $('#anti-count').val());

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
    });

    $('.custom-search-text').customSearch({
        url: './ajax/records.php',
        onSelect: function () {
            var self = $(this);
            $.ajax({
                type: "GET",
                url: './ajax/records.php',
                data: {getRecordsFor: self.text()},
                success: function (data) {
                    var root = self.parents(".custom-search").eq(0).parent();
                    root.find('.custom-search-list').css("display", "none");
                    root.find('table').html(data);
                }
            });
        }
    });

    $('#speed-slider').change( function() {
        game.changeGameSpeed($("#speed-slider").slider("value"));
    });
});