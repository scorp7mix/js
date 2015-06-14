$.fn.customSearch = function(options) {
    var self = this;
    var list = $(self).parent().find('.custom-search-list');
    var ul = list.find('ul');

    $(this).on("input", function () {
        $.ajax({
            type: "GET",
            url: options.url,
            data: {searchText: $(self).val()},
            success: function (data) {
                if (data.length != 0) {

                    list.css("display", "block");
                    ul.empty();

                    for (var i = 0, l = data.length; i < l; i++) {
                        var li = $("<li>" + data[i] + "</li>");
                        li.click(options.onSelect);
                        ul.append(li);
                    }
                }
            },
            error: function () {
            },
            dataType: 'json'
        });
    }).blur(function() {
        $(self).val('');
        setTimeout(function(){list.css("display", "none")}, 150);
    });
};
