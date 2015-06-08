// КЛАСС СЛАЙДЕРА
/*
 * 1) Блоку-контейнеру добавляются кнопки - вперед / назад.
 * 2) Функция changeSlide при помощи AJAX-запроса получает новый адрес картинки
 *    и ее индекс.
 * 3) При старте картинки начинают меняться раз в 3сек. При клике на картинке, смена
 *    слайдов останавливается. При клике на кнопке, смена слайдов возобновляется,
 *    при этом направление зависит от кнопки.
 */
function Slider(container) {
    var self = this;

    var slideId;

    var sliderTimer;

    // ПРИВАТНЫЕ ФУНКЦИИ

    // вывод ошибки при ajax запросе
    function ajaxErr(XMLHttpRequest) {
        alert("Сервер данных не отвечает!" +
            " Ошибка: " + XMLHttpRequest.status +
            " Статус: " + XMLHttpRequest.statusText);
    }

    function changeSlide(direction) {
        $.ajax("./ajax/images.php", {
            type: "POST",
            data: direction ? "id=" + slideId + "&direction=" + direction : '',
            success: function(data) {
                var dataArr = data.split(' ');
                slideId = Number(dataArr[1]);
                container.css("background-image", "url('" + dataArr[0] + "')");
                refreshTimers(function() { changeSlide(direction ? direction : 'next'); });
            },
            error: ajaxErr
        });
    }

    function refreshTimers(func) {
        if(sliderTimer) clearTimeout(sliderTimer);
        sliderTimer = setTimeout(func, 3000);
    }

    // ПУБЛИЧНЫЕ МЕТОДЫ

    self.create = function() {
        container.addClass('slider');

        var prevArrow = $('<div class="slider-arrow slider-prev"></div>');
        var nextArrow = $('<div class="slider-arrow slider-next"></div>');

        container.append(prevArrow).append(nextArrow);

        container.on('click', function() {
            if(sliderTimer) clearTimeout(sliderTimer);
        });

        prevArrow.on('click', function() { changeSlide('prev'); });
        nextArrow.on('click', function() { changeSlide('next'); });

        changeSlide();
    };
}

$(document).ready(function() {

    var slider1 = new Slider($("#slider1"));
    slider1.create();
    var slider2 = new Slider($("#slider2"));
    slider2.create();
    var slider3 = new Slider($("#slider3"));
    slider3.create();

});