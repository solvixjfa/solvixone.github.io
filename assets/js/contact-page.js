// assets/js/contact-page.js (Perbaikan Final)

document.addEventListener('DOMContentLoaded', function () {
    // 1. Inisialisasi Supabase secara langsung dan aman di sini
    const SUPABASE_URL = 'https://xtarsaurwclktwhhryas.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0YXJzYXVyd2Nsa3R3aGhyeWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDM1ODksImV4cCI6MjA2NzM3OTU4OX0.ZAgs8NbZs8F2GuBVfiFYuyqOLrRC1hemdMyE-i4riYI';
    
    // Periksa apakah library Supabase tersedia secara global
    // Jika Supabase dimuat via CDN, objek 'supabase' akan tersedia secara global.
    if (typeof supabase === 'undefined' || typeof supabase.createClient === 'undefined') {
        console.error('Supabase library is not loaded correctly. Make sure <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> is in your HTML.');
        return;
    }
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // 2. Dapatkan elemen-elemen dari DOM
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error("Formulir dengan ID 'contact-form' tidak ditemukan.");
        return; // Hentikan jika form tidak ada
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton ? submitButton.querySelector('.btn-text') : null;
    const buttonSpinner = submitButton ? submitButton.querySelector('.spinner-border') : null;
    const statusMessage = document.getElementById('status-message');

    // 3. Tambahkan event listener ke form
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah reload halaman

        // Validasi input dasar
        if (!form.nama_lengkap.value.trim() || !form.email.value.trim() || !form.pesan.value.trim()) {
            displayMessage('Nama, email, dan pesan wajib diisi.', 'warning');
            return;
        }

        // Tampilkan status loading
        setLoading(true);

        // 4. Siapkan data sesuai struktur Anda
        const data = {
            name: form.nama_lengkap.value.trim(),
            email: form.email.value.trim(),
            phone: form.whatsapp.value.trim() || null, // Jika opsional dan kosong, kirim null
            message: `Layanan: ${form.kebutuhan_layanan.value}\n\nPesan:\n${form.pesan.value.trim()}`,
            source_page: 'contact-form',
            status: 'pending',
            is_read: false,
            created_at: new Date().toISOString()
        };

        // 5. Kirim data ke tabel 'kontak_form' di Supabase
        // PASTIKAN NAMA TABEL INI SESUAI DENGAN YANG ADA DI SUPABASE ANDA
        const { error } = await client.from('kontak_form').insert([data]);

        // Hentikan status loading
        setLoading(false);

        if (error) {
            console.error('❌ Supabase Insert Error:', error);
            displayMessage('Gagal mengirim pesan. Silakan coba lagi nanti. Detail: ' + error.message, 'danger');
        } else {
            displayMessage('✅ Pesan berhasil terkirim! Terima kasih telah menghubungi kami.', 'success');
            form.reset(); // Kosongkan form setelah berhasil
        }
    });

    // Fungsi untuk mengatur status loading pada tombol
    function setLoading(isLoading) {
        if (!submitButton) return; // Pastikan tombol ada

        if (isLoading) {
            submitButton.disabled = true;
            if(buttonText) buttonText.classList.add('d-none');
            if(buttonSpinner) buttonSpinner.classList.remove('d-none');
        } else {
            submitButton.disabled = false;
            if(buttonText) buttonText.classList.remove('d-none');
            if(buttonSpinner) buttonSpinner.classList.add('d-none');
        }
    }

    // Fungsi untuk menampilkan pesan status di halaman
    function displayMessage(message, type) {
        if (!statusMessage) return; // Pastikan elemen status ada
        statusMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 6000); // Pesan akan hilang setelah 6 detik
    }
});
