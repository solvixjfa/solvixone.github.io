// assets/js/pricing-interactive.js (Versi Interaktif dengan Tooltip)

document.addEventListener('DOMContentLoaded', function() {
    
    //  PERBAIKAN: Data fitur ditambahkan ikon info dengan tooltip
    const featuresData = {
        general: [
            { name: 'Jumlah Halaman', values: ['1 Halaman', 's/d 5 Halaman', 's/d 10 Halaman', 'Tidak Terbatas'] },
            { name: 'Desain Responsif', values: ['check', 'check', 'check', 'check'] },
            { name: 'Desain UI/UX Kustom <i class="bx bxs-info-circle info-tooltip" data-bs-toggle="tooltip" title="Desain dibuat dari nol sesuai brand Anda, bukan dari template."></i>', values: ['x', 'x', 'check', 'check'] },
            { name: 'Jumlah Revisi Desain', values: ['1x Minor', '2x Minor', '3x Mayor', 'Tidak Terbatas'] },
            { name: 'Estimasi Waktu Pengerjaan', values: ['1-2 Minggu', '2-3 Minggu', '3-5 Minggu', 'Sesuai Proyek'] },
            { name: 'Bantuan Setup Domain/Hosting', values: ['check', 'check', 'check', 'check'] }
        ],
        content: [
            { name: 'Formulir Kontak', values: ['<i class="bx bx-x"></i> (WA/Email)', 'check', 'check', 'check'] },
            { name: 'Galeri Foto/Video', values: ['x', 'check', 'check', 'check'] },
            { name: 'Integrasi Peta Lokasi', values: ['x', 'check', 'check', 'check'] },
            { name: 'Fitur Blog / Artikel', values: ['x', 'x', 'check', 'check'] },
            { name: 'Update Konten Mandiri (CMS) <i class="bx bxs-info-circle info-tooltip" data-bs-toggle="tooltip" title="Anda bisa mengubah teks atau gambar sendiri tanpa perlu coding."></i>', values: ['x', 'x', 'check', 'check'] },
            { name: 'Pelatihan Manajemen Konten', values: ['x', 'x', 'check', 'check'] }
        ],
        marketing: [
            { name: 'Setup SEO On-Page Dasar <i class="bx bxs-info-circle info-tooltip" data-bs-toggle="tooltip" title="Optimasi judul, deskripsi, dan keyword agar mudah ditemukan Google."></i>', values: ['x', 'check', 'check', 'check'] },
            { name: 'Pendaftaran Google Business Profile', values: ['x', 'check', 'check', 'check'] },
            { name: 'Integrasi Media Sosial', values: ['x', 'check', 'check', 'check'] },
            { name: 'Instalasi Pixel & Analitik <i class="bx bxs-info-circle info-tooltip" data-bs-toggle="tooltip" title="Memasang kode pelacak dari Facebook/Google untuk analisis pengunjung."></i>', values: ['x', 'x', 'check', 'check'] },
            { name: 'Laporan Performa Bulanan', values: ['x', 'x', 'x', 'check'] }
        ],
        technical: [
            { name: 'Keamanan Dasar (SSL)', values: ['check', 'check', 'check', 'check'] },
            { name: 'Optimasi Kecepatan Dasar', values: ['check', 'check', 'check', 'check'] },
            { name: 'Optimasi Kecepatan Lanjutan', values: ['x', 'x', 'check', 'check'] },
            { name: 'Backup Mingguan', values: ['x', 'x', 'check', 'check'] },
            { name: 'Otomatisasi & Integrasi API', values: ['x', 'x', 'x', 'check'] },
            { name: 'Dukungan Teknis', values: ['Email', 'Email', 'WA & Email', 'Prioritas 24/7'] }
        ]
    };

    const filterContainer = document.getElementById('pricing-filter-buttons');
    const tableBody = document.getElementById('comparison-tbody');

    if (!filterContainer || !tableBody) {
        return;
    }

    const createIcon = (type) => `<i class='bx bx-${type}'></i>`;

    // ✅ BARU: Fungsi untuk menginisialisasi tooltip Bootstrap
    const initializeTooltips = () => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    };

    const renderTable = (filter) => {
        tableBody.classList.add('fade-out');
        setTimeout(() => {
            tableBody.innerHTML = '';
            const categoriesToRender = (filter === 'all') ? Object.keys(featuresData) : [filter];

            categoriesToRender.forEach(categoryKey => {
                const headerRow = document.createElement('tr');
                headerRow.className = 'section-header';
                const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
                headerRow.innerHTML = `<td colspan="5">Fitur ${categoryName}</td>`;
                tableBody.appendChild(headerRow);

                featuresData[categoryKey].forEach(feature => {
                    const featureRow = document.createElement('tr');
                    let cellsHTML = `<td>${feature.name}</td>`; // Nama fitur sudah mengandung HTML tooltip
                    feature.values.forEach(value => {
                        if (value.startsWith('<i')) {
                            cellsHTML += `<td>${value}</td>`;
                        } else if (value === 'check' || value === 'x') {
                            cellsHTML += `<td>${createIcon(value)}</td>`;
                        } else {
                            cellsHTML += `<td>${value}</td>`;
                        }
                    });
                    featureRow.innerHTML = cellsHTML;
                    tableBody.appendChild(featureRow);
                });
            });
            
            tableBody.classList.remove('fade-out');
            initializeTooltips(); //  Panggil fungsi tooltip setelah tabel selesai dibuat
        }, 200);
    };

    filterContainer.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const filter = e.target.getAttribute('data-filter');
            filterContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            renderTable(filter);
        }
    });

    renderTable('all');
});

