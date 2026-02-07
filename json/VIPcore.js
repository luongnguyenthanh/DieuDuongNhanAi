$(function() {
    // Ngày hiện tại
    function formatDate(date) {
        const d = String(date.getDate()).padStart(2,'0');
        const m = String(date.getMonth()+1).padStart(2,'0');
        return `${d}/${m}/${date.getFullYear()}`;
    }
    $("#evalDate").val(formatDate(new Date()));

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