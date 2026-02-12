$(function() {
    // 1. Khởi tạo lịch Datepicker
    $("#evalDate").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2030",
        maxDate: 0, // 0 nghĩa là hôm nay, chặn tuyệt đối ngày tương lai
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

    // Chọn mức VIP
    $(".vip-option").on("click", function() {
        $(".vip-option").removeClass("selected");
        $(this).addClass("selected");
        
        const score = $(this).data("score");
        $("#result-score").text(score);
        
        let advice = "";
        if (score === 0) advice = "Không có dấu hiệu viêm TM→ Theo dõi, đánh giá ít nhất 2 lần/ngày.";
        else if (score === 1) advice = "Có thể là giai đoạn sớm của viêm TM → Tăng cường theo dõi, đánh giá (ít nhất mỗi 6 giờ/lần.";
        else if (score === 2) advice = "Giai đoạn sớm của viêm TM → Thay đường truyền, đặt tại vị trí khác. Ghi chép HSBA. Cân nhắc điều trị";
        else if (score === 3) advice = "Giai đoạn trung bình của viêm TM → Thay đường truyền, đặt tại vị trí khác. Ghi chép HSBA. Điều trị.";
        else if (score === 4 ) advice = "Giai đoạn tiến triển của viêm TM hoặc bắt đầu huyết khối TM → Thay đường truyền. Cân nhắc điều trị kháng sinh, cấy máu, cấy dịch chân kim. Ghi chép HSBA. Điều trị";
        else if (score === 5) advice = "Giai đoạn tiến triển của huyết khối → Thay đường truyền. Cân nhắc điều trị kháng sinh, cấy máu, cấy dịch chân kim. Ghi chép HSBA. Điều trị";
        
        $("#result-advice").text(advice);
    });
});
