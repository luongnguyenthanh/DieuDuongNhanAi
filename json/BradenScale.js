$(function() {
    // Khởi tạo datepicker
    $("#evalDate").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "2025:2050",
        maxDate: 0,                   // Cách viết chuẩn để chặn ngày tương lai (0 ngày tính từ hôm nay)
        showButtonPanel: true,
        dayNamesMin: ["CN","T2","T3","T4","T5","T6","T7"],
        monthNamesShort: ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"]
    });

    // Gán ngày hiện tại một cách an toàn để Datepicker nhận diện được
    $("#evalDate").datepicker("setDate", new Date());
});

// Hàm tính toán giữ nguyên nhưng thêm kiểm tra tồn tại của ID
function calc() {
    let t = 0;
    const selects = document.querySelectorAll('select[data-max]');
    if (selects.length > 0) {
        selects.forEach(s => t += Number(s.value));
    }
    
    const totalElem = document.getElementById('total');
    const levelElem = document.getElementById('level');
    
    if (totalElem) totalElem.textContent = t;

    let txt = "";
    if (t <= 9) txt = "NGUY CƠ RẤT CAO";
    else if (t <= 12) txt = "NGUY CƠ CAO";
    else if (t <= 14) txt = "NGUY CƠ TRUNG BÌNH";
    else if (t <= 18) txt = "NGUY CƠ THẤP";
    else txt = "NGUY CƠ RẤT THẤP";

    if (levelElem) levelElem.textContent = txt;
}
