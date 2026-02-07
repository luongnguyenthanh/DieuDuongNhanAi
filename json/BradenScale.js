// BradenScale.js
document.getElementById('date').value = new Date().toLocaleDateString('vi-VN');

function calc() {
    let t = 0;
    document.querySelectorAll('select[data-max]').forEach(s => t += +s.value);
    document.getElementById('total').textContent = t;

    let txt = "";
    if (t <= 9) txt = "NGUY CƠ RẤT CAO";
    else if (t <= 12) txt = "NGUY CƠ CAO";
    else if (t <= 14) txt = "NGUY CƠ TRUNG BÌNH";
    else if (t <= 18) txt = "NGUY CƠ THẤP";
    else txt = "NGUY CƠ RẤT THẤP";

    document.getElementById('level').textContent = txt;
}
calc();

$(function() {
    $("#evalDate").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2030",
        maxDate: "+0d",               // không cho chọn ngày tương lai
        showButtonPanel: true,
        dayNamesMin: ["CN","T2","T3","T4","T5","T6","CN"],
        monthNamesShort: ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"]
    }).val(new Date().toLocaleDateString('vi-VN')); // mặc định là hôm nay
});