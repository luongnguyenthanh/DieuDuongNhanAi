document.getElementById('date').value = new Date().toLocaleDateString('vi-VN');

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