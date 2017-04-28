$(function () {
    $('body').on('keydown.mouse', function (e) {
        var cell = $('.rat').parent();
        var classes = cell.attr('class');
        var x = cell.parent().children('.cell').index(cell);
        var y = $('#cells').children('.row').index(cell.parent());
        var res = mouseMove(e.keyCode, classes, {
            x: x,
            y: y
        });
        if (res) {
            $('.rat').detach().appendTo($($('#cells').children('.row')[res.y]).children('.cell')[res.x]);
        }
    })


    function mouseMove(keycode, classes, pos) {
        var keys = [37, 38, 39, 40];
        var forbiddenkeyStr = classes
            .replace('left', '37')
            .replace('top', '38')
            .replace('right', '39')
            .replace('bottom', '40');
        if (keys.indexOf(keycode) >= 0 && forbiddenkeyStr.indexOf(keycode) < 0) {
            switch (keycode) {
                case 37:
                    return {
                        x: pos.x - 1,
                        y: pos.y
                    }
                case 38:
                    return {
                        x: pos.x,
                        y: pos.y - 1
                    }
                case 39:
                    return {
                        x: pos.x + 1,
                        y: pos.y
                    }
                case 40:
                    return {
                        x: pos.x,
                        y: pos.y + 1
                    }
            }
        } else {
            return false;
        }
    }
});

