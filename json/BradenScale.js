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

// thêm mới 12/02/2026
async function saveAndPrint() {
    // Lấy vùng container để chụp ảnh PDF
    const element = document.querySelector('.container');
    
    // Lấy giá trị tên và ngày (Dùng ID đã thêm)
    const nameValue = document.getElementById('patientName').value || "Khong_Ten";
    const dateValue = document.getElementById('evalDate').value || "01-01-2026";
    const fileName = `Braden_${nameValue}_${dateValue.replace(/\//g, "-")}.pdf`;

    const btn = document.querySelector('.print-btn button');
    btn.innerText = "Đang lưu & In...";
    btn.disabled = true;

    const opt = {
        margin: [10, 10],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // Tạo chuỗi Base64 của PDF
        const pdfBase64 = await html2pdf().set(opt).from(element).outputPdf('datauristring');
        const base64Content = pdfBase64.split(',')[1];

        // Gửi sang Google Apps Script (Netlify -> Google Drive)
        await fetch(GOOGLE_SCRIPT_URL, {"https://script.google.com/macros/s/AKfycby73cl5gN8B_gYM-RnjgKj5xEEaV348sBv3xntmSMUa8r2tkwnVvxcM9VFohxxw44c/exec"
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify({
                pdfBase64: base64Content,
                fileName: fileName
            })
        });
    } catch (e) {
        console.error("Lưu Drive lỗi:", e);
    } finally {
        btn.innerText = "In Phiếu";
        btn.disabled = false;
        // Thực hiện in ra máy in vật lý
        window.print();
    }
}
