function updateResult() {
    const select = document.getElementById('degreeSelect');
    const val = select.value;
    const resultBox = document.getElementById('resultBox');
    const degreeEl = document.getElementById('degree');
    const levelEl = document.getElementById('level');

    if (val === "0") {
        resultBox.style.display = 'none';
        return;
    }

    resultBox.style.display = 'block';
    degreeEl.textContent = val;

    let levelText = "";
    let desc = "";
    if (val == 1) { levelText = "NHẸ"; desc = "Lõm <2 mm – Biến mất ngay"; }
    else if (val == 2) { levelText = "TRUNG BÌNH"; desc = "Lõm 2-4 mm – Biến mất 10-15 giây"; }
    else if (val == 3) { levelText = "NẶNG"; desc = "Lõm 4-6 mm – Biến mất >1 phút"; }
    else if (val == 4) { levelText = "RẤT NẶNG"; desc = "Lõm 6-8 mm – Biến mất 2-5 phút"; }

    levelEl.textContent = levelText + " (" + desc + ")";
}
$(function() {
    // Khởi tạo datepicker
    $("#evalDate").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2030",
        maxDate: 0, // Chặn tuyệt đối ngày tương lai
        showButtonPanel: true,
        dayNamesMin: ["CN","T2","T3","T4","T5","T6","T7"],
        monthNamesShort: ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"],
        // Cho phép bấm vào icon hoặc ô input để hiện lịch dù có readonly
        beforeShow: function(input, inst) {
            setTimeout(function() {
                $('.ui-datepicker').css('z-index', 9999);
            }, 0);
        }
    });

    // Gán ngày mặc định là hôm nay một cách chuẩn xác
    $("#evalDate").datepicker("setDate", new Date());

    // Mẹo: Khi click vào ô input sẽ hiện lịch ngay cả khi có readonly
    $("#evalDate").on("click", function() {
        $(this).datepicker("show");
    });
});
