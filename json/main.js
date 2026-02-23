// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const header = document.getElementById('header');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinks = mobileNav.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe stats
document.querySelectorAll('.stat-item').forEach(stat => {
    observer.observe(stat);
});

// Number counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 25);
}

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                stat.textContent = '0+';
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 1 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Website loaded successfully! ✨');
// Hàm mở modal và load iframe
function openToolModal(title, url) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('toolIframe').src = url;
  document.getElementById('toolModal').style.display = 'flex';
}

// Đóng modal và reset iframe (tránh load lại không cần thiết)
function closeModal() {
  document.getElementById('toolModal').style.display = 'none';
  document.getElementById('toolIframe').src = 'about:blank';
}

// Đóng khi click bên ngoài modal-content
document.getElementById('toolModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Đóng bằng phím Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// modal

function openToolModal(title, url) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('toolIframe').src = url;
  document.getElementById('toolModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('toolModal').style.display = 'none';
  // Reset iframe để tránh load lại nội dung cũ khi mở lần sau
  setTimeout(() => {
    document.getElementById('toolIframe').src = 'about:blank';
  }, 300);
}

// Đóng modal khi click bên ngoài content
document.getElementById('toolModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Đóng bằng phím Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('toolModal').style.display === 'flex') {
    closeModal();
  }
});

// Modal lịch sử hình thành
function openHistoryModal() {
    const modal = document.getElementById('historyModal');
    const iframe = document.getElementById('historyIframe');
    if (modal && iframe) {
        iframe.src = 'lich-su-hinh-thanh.html';
        modal.style.display = 'flex';
    }
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Reset iframe để tiết kiệm tài nguyên
    const iframe = document.getElementById('historyIframe');
    if (iframe) {
        iframe.src = 'about:blank';
    }
}

//Modal thành tựu
function openAchievementModal() {
    const modal = document.getElementById('AchievementModal');
    const iframe = document.getElementById('AchievementIframe');
    if (modal && iframe) {
        iframe.src = 'cac-thanh-tuu.html';
        modal.style.display = 'flex';
    }
}

function closeAchievementModal() {
    const modal = document.getElementById('AchievementModal');
    const iframe = document.getElementById('AchievementIframe');
    if (modal) modal.style.display = 'none';
    if (iframe) iframe.src = 'about:blank';
}

// Đóng modal Achievement khi click bên ngoài
document.getElementById('AchievementModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeAchievementModal();
    }
});

// Đóng bằng Esc (cập nhật để hỗ trợ cả 3 modal)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.getElementById('toolModal')?.style.display === 'flex') closeModal();
        if (document.getElementById('historyModal')?.style.display === 'flex') closeHistoryModal();
        if (document.getElementById('AchievementModal')?.style.display === 'flex') closeAchievementModal();
    }
});
