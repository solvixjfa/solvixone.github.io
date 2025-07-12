// assets/js/custom.js (Versi Universal - Tanpa jQuery)

document.addEventListener('DOMContentLoaded', function() {

    // 1. Inisialisasi AOS (Animate On Scroll)
    // Berfungsi di semua halaman yang memiliki atribut data-aos.
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }

    // 2. Efek scroll pada Navbar
    // Berfungsi di semua halaman untuk efek glassmorphism.
    const mainNav = document.getElementById('main_nav');
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }

    // 3. Custom Cursor Glow Effect
    // Berfungsi di semua halaman (hanya aktif di desktop).
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia("(min-width: 992px)").matches) {
        document.addEventListener('mousemove', function(e) {
            cursorGlow.style.left = e.pageX + 'px';
            cursorGlow.style.top = e.pageY + 'px';
        });
    }

    // 4. Inisialisasi Isotope untuk Filter Portofolio (HANYA UNTUK index.html)
    // Kode ini hanya akan berjalan jika elemen .projects ditemukan.
    const projectsContainer = document.querySelector('.projects');
    if (projectsContainer && typeof Isotope !== 'undefined') {
        const iso = new Isotope(projectsContainer, {
            itemSelector: '.project',
            layoutMode: 'fitRows'
        });

        const filterButtons = document.querySelectorAll('#filter-buttons button');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                iso.arrange({ filter: filterValue });

                // Mengatur class 'active' pada tombol
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // 5. Animasi Progress Bar (HANYA UNTUK about.html)
    // Kode ini hanya akan berjalan jika elemen .skill ditemukan.
    const skillsSection = document.querySelector('.skill');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = document.querySelectorAll('.skill-progress .progress-bar');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }
});

// Preloader (berfungsi di semua halaman)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Tambahkan ini ke dalam file assets/js/custom.js
// Di dalam event listener 'DOMContentLoaded'

    // 6. Animasi Angka pada Dasbor Hasil
    const resultsGrid = document.querySelector('.results-grid');
    if (resultsGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = resultsGrid.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 1500; // Durasi animasi dalam milidetik
                        const stepTime = 20; // Interval update
                        const totalSteps = duration / stepTime;
                        const increment = target / totalSteps;
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.innerText = target;
                                clearInterval(timer);
                            } else {
                                counter.innerText = Math.ceil(current);
                            }
                        }, stepTime);
                    });
                    observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
                }
            });
        }, { threshold: 0.5 }); // Trigger saat 50% elemen terlihat

        observer.observe(resultsGrid);
    }

