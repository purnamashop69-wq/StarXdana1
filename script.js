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

// ===== WHATSAPP FUNCTION DENGAN DATA FORM =====
// Fungsi untuk mengirim data form ke WhatsApp
function sendFormToWhatsApp(data) {
    // Nomor WhatsApp tujuan
    const phoneNumber = '082216668939';
    
    // Format pesan dengan data form
    let message = '📋 *DATA PENGAJUAN PINJAMAN STARXDANA*%0A%0A';
    message += '━━━━━━━━━━━━━━━━━━━━━%0A';
    message += `📌 *Nama Lengkap*: ${data.nama}%0A`;
    message += `📱 *No. Handphone*: ${data.hp}%0A`;
    message += `📍 *Lokasi*: ${data.lokasi}%0A`;
    message += `🚗 *Jenis BPKB*: ${data.bpkb}%0A`;
    message += `📨 *Info Promo*: ${data.promo}%0A`;
    message += '━━━━━━━━━━━━━━━━━━━━━%0A';
    message += '%0A✅ *Terima kasih! Tim StarXdana akan segera menghubungi Anda.*%0A';
    message += '%0A*⭐ StarXdana*%0A';
    message += 'Solusi Pinjam Dana dengan Jaminan Kendaraan';
    
    // Buka WhatsApp dengan pesan yang sudah diformat
    openWhatsApp(phoneNumber, message);
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

// ===== FORM SUBMIT KE WHATSAPP =====
// ===== FORM SUBMIT KE WHATSAPP (DENGAN LOADING) =====
const form = document.getElementById('pinjamanForm');
const successDiv = document.getElementById('formSuccess');
const submitBtn = form.querySelector('.btn-primary');

if (form && successDiv) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data dari form
        const nama = document.getElementById('nama').value.trim();
        const hp = document.getElementById('hp').value.trim();
        const lokasi = document.getElementById('lokasi').value;
        const bpkb = document.querySelector('input[name="bpkb"]:checked');
        const promo = document.getElementById('promo').checked ? 'Ya' : 'Tidak';
        const syarat = document.getElementById('syarat').checked;
        
        // Validasi
        if (!nama || !hp || !lokasi || !syarat) {
            alert('⚠️ Mohon lengkapi semua data yang wajib (Nama, HP, Lokasi, dan setujui Syarat & Ketentuan).');
            return;
        }
        
        if (hp.length < 8) {
            alert('⚠️ Nomor handphone tidak valid. Minimal 8 digit.');
            return;
        }
        
        if (!bpkb) {
            alert('⚠️ Silakan pilih jenis BPKB (Mobil atau Motor).');
            return;
        }
        
        // Siapkan data untuk dikirim ke WhatsApp
        const formData = {
            nama: nama,
            hp: hp,
            lokasi: lokasi,
            bpkb: bpkb.value,
            promo: promo
        };
        
        // Tampilkan loading di tombol
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Tampilkan pesan sukses
        successDiv.style.display = 'block';
        successDiv.innerHTML = `
            <p style="font-weight:600; color:#166534;">
                <i class="fas fa-spinner fa-spin"></i> 
                Mengirim data ke WhatsApp...
            </p>
        `;
        
        // Kirim ke WhatsApp (delay 1.5 detik agar user melihat loading)
        setTimeout(function() {
            sendFormToWhatsApp(formData);
            
            // Update tombol
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Kirim via WhatsApp';
            submitBtn.disabled = false;
            
            // Update pesan sukses
            successDiv.innerHTML = `
                <p style="font-weight:600; color:#166534;">
                    <i class="fas fa-check-circle"></i> 
                    ✅ Data berhasil dikirim! Tim StarXdana akan segera menghubungi Anda di WhatsApp.
                </p>
                <p style="font-size:0.9rem; color:#166534; margin-top:8px;">
                    <i class="fas fa-whatsapp" style="color:#25D366;"></i> 
                    Cek WhatsApp Anda untuk konfirmasi.
                </p>
            `;
            
            // Reset form
            form.reset();
            
            // Sembunyikan pesan sukses setelah 10 detik
            setTimeout(function() {
                successDiv.style.display = 'none';
                // Reset ke tampilan awal
                successDiv.innerHTML = `
                    <p style="font-weight:600; color:#166534;">
                        <i class="fas fa-check-circle"></i> 
                        Terima kasih! Tim StarXdana akan segera menghubungi Anda.
                    </p>
                `;
            }, 10000);
            
        }, 1500);
        
        // Scroll ke pesan sukses
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

console.log('⭐ StarXdana - Website loaded successfully!');
console.log('📱 WhatsApp number: 082216668939');
console.log('📋 Form akan otomatis terkirim ke WhatsApp');
