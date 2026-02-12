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

function calc() {
    let total = 0;

    document.querySelectorAll('.qrow').forEach(row => {
        const select = row.querySelector('select');
        const val = parseInt(select.value) || 0;  // ← Quan trọng: || 0 để tránh NaN
        total += val;

        const pointDiv = row.querySelector('.point');
        pointDiv.textContent = val;
        pointDiv.className = 'point p' + val;
    });

    document.getElementById('total').textContent = total;

    let level = total <= 4 ? "NGUY CƠ THẤP" :
                total <= 6 ? "NGUY CƠ TRUNG BÌNH" :
                             "NGUY CƠ CAO";
    document.getElementById('level').textContent = level;
}

// Chạy lần đầu + mỗi khi thay đổi
calc();
document.querySelectorAll('select').forEach(s => s.addEventListener('change', calc));
