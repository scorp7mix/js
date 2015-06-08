$(document).ready(function() {

    var slider = $(".slider");
    var items = slider.find(".slider-item");
    var currentIndex;
    var timeout;

    for(var i = 0; i < items.length; i++) {
        if(items.eq(i).hasClass('active')) currentIndex = i;
    }

    currentIndex = currentIndex || 0;

    function refreshTimers(func) {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(func, 5000);
    }

    function prevSlide() {
        items.eq(currentIndex).removeClass('active');

        if(currentIndex == 0) {
            items.eq(currentIndex = items.length - 1).addClass('active');
        } else {
            items.eq(--currentIndex).addClass('active')
        }

        refreshTimers(prevSlide);
    }

    function nextSlide() {
        items.eq(currentIndex).removeClass('active');

        if(currentIndex == items.length - 1) {
            items.eq(currentIndex = 0).addClass('active');
        } else {
            items.eq(++currentIndex).addClass('active')
        }

        refreshTimers(nextSlide);
    }

    function stopSlide() {
        if(timeout) clearTimeout(timeout);
    }

    slider.on('click','.slider-prev', prevSlide);

    slider.on('click','.slider-next', nextSlide);

    slider.on('click','.slider-item', stopSlide);

    refreshTimers(nextSlide);
});