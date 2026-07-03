// ===== WHATSAPP FUNCTION =====
// Fungsi untuk membuka WhatsApp (aplikasi atau web)
function openWhatsApp(phoneNumber, message) {
    // Hapus karakter non-digit dari nomor
    let cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Pastikan nomor dimulai dengan 62 (kode Indonesia)
    if (cleanNumber.startsWith('0')) {
        cleanNumber = '62' + cleanNumber.substring(1);
    }
    if (!cleanNumber.startsWith('62')) {
        cleanNumber = '62' + cleanNumber;
    }
    
    // Buat URL WhatsApp menggunakan API yang otomatis deteksi aplikasi
    const waUrl = `https://api.whatsapp.com/send/?phone=${cleanNumber}&text=${message}&app_absent=0`;
    
    // Buka di tab baru (otomatis akan ke aplikasi jika terinstall)
    window.open(waUrl, '_blank');
    
    return false;
}

// ===== HAMBURGER TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks) {
                navLinks.classList.remove('open');
            }
        }
    });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(function(item) {
    const question = item.querySelector('.question');
    if (question) {
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(function(i) {
                i.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// ===== FORM SUBMIT =====
const form = document.getElementById('pinjamanForm');
const successDiv = document.getElementById('formSuccess');

if (form && successDiv) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value.trim();
        const hp = document.getElementById('hp').value.trim();
        const lokasi = document.getElementById('lokasi').value;
        const syarat = document.getElementById('syarat').checked;
        
        if (!nama || !hp || !lokasi || !syarat) {
            alert('Mohon lengkapi semua data yang wajib (Nama, HP, Lokasi, dan setujui Syarat & Ketentuan).');
            return;
        }
        
        if (hp.length < 8) {
            alert('Nomor handphone tidak valid. Minimal 8 digit.');
            return;
        }
        
        successDiv.style.display = 'block';
        form.reset();
        
        setTimeout(function() {
            successDiv.style.display = 'none';
        }, 6000);
        
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ===== TRACKING WHATSAPP CLICK =====
document.querySelectorAll('[onclick*="openWhatsApp"]').forEach(function(link) {
    link.addEventListener('click', function() {
        console.log('WhatsApp clicked from: ' + (this.textContent.trim() || 'Floating Button'));
        // Bisa ditambahkan analytics tracking di sini
        // Contoh: gtag('event', 'whatsapp_click', { 'location': window.location.href });
    });
});

// ===== TRACKING PHONE CALL CLICK =====
document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
        console.log('Phone call clicked: ' + this.href);
        // Bisa ditambahkan analytics tracking di sini
    });
});

console.log('StarXdana - Website loaded successfully!');
console.log('WhatsApp number: 082216668939');