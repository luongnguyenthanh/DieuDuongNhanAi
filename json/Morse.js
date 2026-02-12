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
const interventions = [
    "Thông báo cho người bệnh và người nhà người bệnh về mức độ nguy cơ té ngã.",
    "Đảm bảo sàn nhà khô ráo, cảnh báo nơi có nguy cơ té ngã.",
    "Đồ dùng sắp xếp gọn gàng, đảm bảo đồ dùng cá nhân trong tầm tay của người bệnh.",
    "Hướng dẫn người bệnh sử dụng dép có độ bám tốt, cẩn thận khi đi vào nhà vệ sinh.",
    "Hạ giường thấp nhất (nếu có thể), khóa chân giường, kéo xong chắn giường. Khuyên người bệnh tránh thay đổi tư thế đột ngột.",
    "Song chắn giường luôn được kéo lên.",
    "Trợ giúp người bệnh trong đi lại và vận chuyển.",
    "Điều dưỡng luôn hỗ trợ người bệnh khi có thiết bị y tế đi kèm.",
    "Bố trí vật dụng sinh hoạt cần thiết gần người bệnh.",
    "Hỗ trợ người bệnh trong sinh hoạt hằng ngày. Chú ý người bệnh trong khi đi vệ sinh.",
    "Khuyến khích người bệnh khi ngồi phải có người bên cạnh và thông báo ngay cho điều dưỡng khi rời khỏi phòng.",
    "Hỗ trợ người bệnh khi di chuyển, trong lúc tắm, đi vệ sinh.",
    "Cố định người bệnh nếu cần thiết.",
];

function updateInterventions(total) {
    let maxIndex = 0;
    let title = "";

    if (total < 25) {
        maxIndex = 5;   // 6 biện pháp (index 0-5)
        title = "NGUY CƠ THẤP";
    } else if (total <= 44) {
        maxIndex = 9;   // 10 biện pháp (index 0-9)
        title = "NGUY CƠ TRUNG BÌNH";
    } else {
        maxIndex = 13;  // 14 biện pháp (index 0-13)
        title = "NGUY CƠ CAO";
    }

    let html = `<p style="font-weight:bold; color:#c2185b; margin-bottom:12px;">MỨC NGUY CƠ: ${title} (Tổng điểm: ${total})</p>`;
    html += '<ul>';
    for (let i = 0; i <= maxIndex; i++) {
        html += `<li>${interventions[i]}</li>`;
    }
    html += '</ul>';

    document.getElementById('interventionContent').innerHTML = html;
}

document.querySelectorAll('.myselect').forEach(sel => {
    const selected = sel.querySelector('.selected');
    const optionsContainer = sel.querySelector('.options');
    const items = optionsContainer.querySelectorAll('div');

    // Khởi tạo mặc định
    if (items.length > 0) {
        selected.innerHTML = items[0].innerHTML;
        sel.dataset.value = items[0].dataset.value || '0';
    }

    // Mở/đóng dropdown
    selected.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn lan tỏa lên document
        document.querySelectorAll('.myselect').forEach(s => {
            if (s !== sel) s.classList.remove('open');
        });
        sel.classList.toggle('open');
    });

    // Chọn option
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            selected.innerHTML = item.innerHTML;
            sel.dataset.value = item.dataset.value || '0';
            sel.classList.remove('open');
            calc();
        });
    });
});

// Đóng tất cả dropdown khi click ra ngoài
document.addEventListener('click', (e) => {
    if (!e.target.closest('.myselect')) {
        document.querySelectorAll('.myselect').forEach(sel => {
            sel.classList.remove('open');
        });
    }
});

function calc() {
    let total = 0;
    document.querySelectorAll('.qrow').forEach(row => {
        const val = parseInt(row.querySelector('.myselect').dataset.value) || 0;
        total += val;
        const pointDiv = row.querySelector('.point');
        if (pointDiv) {
            pointDiv.textContent = val;
            pointDiv.className = 'point p' + (val === 0 ? '0' : val); // tránh class lỗi nếu val=0
        }
    });

    const totalEl = document.getElementById('total');
    if (totalEl) totalEl.textContent = total;

    const levelEl = document.getElementById('level');
    if (levelEl) {
        const level = total < 25 ? "NGUY CƠ THẤP" : total <= 44 ? "NGUY CƠ TRUNG BÌNH" : "NGUY CƠ CAO";
        levelEl.textContent = level;
    }

    updateInterventions(total);
}

calc();

function saveToDriveAndPrint() {
    // Thu thập dữ liệu
    const data = {
        name: document.querySelector('input[placeholder="Nhập họ và tên bệnh nhân"]').value.trim() || "Chưa nhập",
        gender: document.querySelector('select').value || "",
        date: document.getElementById('date').value,
        department: document.querySelectorAll('select')[1].value || "Chưa chọn",
        ageCategory: document.querySelectorAll('.myselect')[0].querySelector('.selected').innerHTML,
        fallHistory: document.querySelectorAll('.myselect')[1].querySelector('.selected').innerHTML,
        mobilityAid: document.querySelectorAll('.myselect')[2].querySelector('.selected').innerHTML,
        ivTherapy: document.querySelectorAll('.myselect')[3].querySelector('.selected').innerHTML,
        gait: document.querySelectorAll('.myselect')[4].querySelector('.selected').innerHTML,
        mentalStatus: document.querySelectorAll('.myselect')[5].querySelector('.selected').innerHTML,
        totalScore: document.getElementById('total').textContent,
        level: document.getElementById('level').textContent
    };

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlWpKUB4RYr9gwoOdcnlYyAcU-mSc3nEmU3LawbGg8m--QscHRuYcmbuTpOmVpnxs/exec";  // ← dán URL Web App vào đây

    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",                    // Bắt buộc để tránh lỗi CORS
        headers: {
            "Content-Type": "text/plain;charset=utf-8"  // Quan trọng để tránh preflight
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Đã gửi lưu lên Google Drive thành công!\nBắt đầu in phiếu...");
        window.print();
    })
    .catch(err => {
        console.error("Lỗi gửi dữ liệu:", err);
        alert("Không thể lưu lên Drive lúc này (lỗi mạng hoặc quyền), nhưng vẫn in phiếu được.");
        window.print();
    });

}


