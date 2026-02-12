// Dán URL Web App bạn nhận được từ Google Apps Script vào đây
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtqeKdQCAQJBCh4wfLBN_l8ZIqDqG-PxjRBNspf2bHkWNPpKH-V1HDBnEC6BVc9yU/exec";

async function saveAndPrint() {
    // 1. Xác định vùng cần chụp (là thẻ container chứa toàn bộ phiếu)
    const element = document.querySelector('.container');
    
    // 2. Lấy tên bệnh nhân và ngày để đặt tên file
    const patientName = document.getElementById('patientName').value || "Khong_Ten";
    const rawDate = document.getElementById('evalDate').value || "01-01-2024";
    const formattedDate = rawDate.replace(/\//g, "-");
    const fileName = `Braden_${patientName}_${formattedDate}.pdf`;

    // 3. Thay đổi trạng thái nút bấm để người dùng không bấm liên tục
    const btn = document.querySelector('.print-btn button');
    const originalText = btn.innerText;
    btn.innerText = "Đang xử lý & lưu Drive...";
    btn.disabled = true;

    // 4. Cấu hình thư viện html2pdf
    const opt = {
        margin: [10, 10],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            letterRendering: true 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // TẠO PDF: Chuyển đổi HTML thành chuỗi Base64
        const pdfBase64 = await html2pdf().set(opt).from(element).outputPdf('datauristring');
        const base64Content = pdfBase64.split(',')[1];

        // GỬI LÊN DRIVE: Chạy ngầm việc gửi dữ liệu
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Chế độ này quan trọng khi chạy trên Netlify/Local
            body: JSON.stringify({
                pdfBase64: base64Content,
                fileName: fileName
            })
        });

        console.log("Đã lưu file lên Google Drive thành công.");

    } catch (error) {
        console.error("Lỗi xử lý PDF:", error);
        alert("Không thể lưu lên Drive, nhưng hệ thống sẽ mở lệnh in ngay bây giờ.");
    } finally {
        // 5. Khôi phục nút bấm
        btn.innerText = originalText;
        btn.disabled = false;

        // 6. QUAN TRỌNG: Lệnh in máy tính nằm ở đây
        // Nó sẽ chạy sau khi quá trình gửi file Drive hoàn tất
        window.print();
    }
}

// Giữ nguyên các hàm tính toán và Datepicker bên dưới của bạn
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
        maxDate: "+0d",
        dayNamesMin: ["CN","T2","T3","T4","T5","T6","T7"],
        monthNamesShort: ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"]
    }).val(new Date().toLocaleDateString('vi-VN'));
});
