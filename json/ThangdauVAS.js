document.getElementById('evalDate').value = new Date().toLocaleDateString('vi-VN');
$(function() {
    // 1. Khởi tạo lịch Datepicker
    $("#evalDate").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "2025:2050",
        maxDate: 0, 
        showButtonPanel: true,
        dayNamesMin: ["CN","T2","T3","T4","T5","T6","T7"],
        monthNamesShort: ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"]
    });

    // 2. Gán ngày mặc định là hôm nay
    $("#evalDate").datepicker("setDate", new Date());

    // 3. Cho phép hiện lịch khi click vào ô input (dù có readonly)
    $("#evalDate").on("click", function() {
        $(this).datepicker("show");
    });
});
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
