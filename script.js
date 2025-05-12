document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = mobileMenuToggle.querySelector('i');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Smooth scroll & Active Nav Link
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                // e.preventDefault(); // Biarkan default jika scroll-behavior: smooth; di CSS
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.offsetTop;
                    window.scrollTo({
                        top: elementPosition - navbarHeight,
                        behavior: "smooth"
                    });
                }
            }

            // Tutup mobile menu jika terbuka setelah klik link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navbarHeight - 70; // Tambah offset
            let sectionId = current.getAttribute('id');
            let currentNavLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');

            if (currentNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a.active').forEach(activeLink => {
                        activeLink.classList.remove('active');
                    });
                    currentNavLink.classList.add('active');
                } else {
                    currentNavLink.classList.remove('active');
                }
            }
        });
        // Jika di paling atas, aktifkan link Beranda
        if (scrollY < sections[0].offsetTop - navbarHeight - 70) {
            document.querySelectorAll('.nav-links a.active').forEach(activeLink => {
                activeLink.classList.remove('active');
            });
            let homeLink = document.querySelector('.nav-links a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
    navHighlighter(); // Panggil saat load awal

    // Update tahun di footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});