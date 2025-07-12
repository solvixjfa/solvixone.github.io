$(document).ready(function() {

    // --- 1. FUNGSI NAVBAR DINAMIS (LEBIH AMAN) ---
    const nav = document.getElementById('main_nav');

    // Pastikan elemen 'nav' ada sebelum menambahkan event listener
    if (nav) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 50) {
                nav.classList.add('navbar-scrolled');
            } else {
                nav.classList.remove('navbar-scrolled');
            }

            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scroll ke bawah
                nav.classList.add('navbar-hidden');
            } else {
                // Scroll ke atas
                nav.classList.remove('navbar-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }


    // --- 2. FUNGSI ANIMASI ELEMEN SAAT SCROLL (TETAP SAMA, SUDAH BAGUS) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- 3. FUNGSI ANIMASI COUNTER (TETAP SAMA, SUDAH BAGUS) ---
    function animateCounters(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter'); // Optimasi kecil
                counters.forEach(counter => {
                    // Reset counter jika ingin animasi berulang setiap kali terlihat
                    counter.innerText = '0'; 
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-goal');
                        const count = +counter.innerText;
                        const increment = target / 150;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 15);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target); // Hapus baris ini jika ingin animasi berulang
            }
        });
    }

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    const factsSection = document.querySelector('.facts-section');
    if (factsSection) {
        counterObserver.observe(factsSection);
    }
    

    // --- 4. INISIALISASI ISOTOPE (DILAKUKAN SAAT SEMUA GAMBAR SELESAI DIMUAT) ---
    // Dipisahkan dari $(document).ready() untuk kejelasan, namun tetap berfungsi di dalam
    $(window).on('load', function() {
        const $projects = $('.projects').isotope({
            itemSelector: '.project',
            layoutMode: 'fitRows'
        });

        $(".filter-btn").on('click', function(e) {
            e.preventDefault();
            const data_filter = $(this).attr("data-filter");
            $projects.isotope({ filter: data_filter });

            $(".filter-btn").removeClass("active");
            $(this).addClass("active");
        });
    });

});
