document.getElementById('evalDate').value = new Date().toLocaleDateString('vi-VN');

$(function() {
    $("#slider-rest").slider({
        min: 0, max: 10, value: 0,
        slide: function(e, ui) {
            $("#value-rest").text(ui.value);
            $("#result-rest").text(ui.value);
        }
    });

    $("#slider-move").slider({
        min: 0, max: 10, value: 0,
        slide: function(e, ui) {
            $("#value-move").text(ui.value);
            $("#result-move").text(ui.value);
        }
    });

    $("#result-rest").text(0);
    $("#result-move").text(0);
});