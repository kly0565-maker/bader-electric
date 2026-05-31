// Bader Electrical & Solar - JavaScript

// Login System
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const userDashboard = document.getElementById('userDashboard');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    // Check if user is already logged in
    const savedUser = localStorage.getItem('baderUser');
    if (savedUser) {
        showDashboard(savedUser);
    }

    // Open Login Modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
        });
    }

    // Close Login Modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    // Login Form Submit
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Simple validation
            if (email && password) {
                // Save to localStorage (demo purposes)
                localStorage.setItem('baderUser', email);
                loginModal.classList.remove('active');
                showDashboard(email);
                alert('تم تسجيل الدخول بنجاح! مرحباً بك في موقع بدر للكهرباء والطاقة الشمسية');
            } else {
                alert('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('baderUser');
            userDashboard.classList.remove('active');
            if (loginBtn) loginBtn.style.display = 'block';
            alert('تم تسجيل الخروج بنجاح');
        });
    }

    // Show Dashboard
    function showDashboard(email) {
        if (userDashboard) {
            userDashboard.classList.add('active');
            if (userNameDisplay) {
                userNameDisplay.textContent = 'مرحباً: ' + email.split('@')[0];
            }
        }
        if (loginBtn) loginBtn.style.display = 'none';
    }

    // Mobile Menu Toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active-mobile');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const successMsg = document.getElementById('successMsg');
            if (successMsg) {
                successMsg.classList.add('show');
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
            contactForm.reset();
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .feature-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
