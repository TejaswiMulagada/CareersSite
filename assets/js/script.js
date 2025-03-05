// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme Switching
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        localStorage.setItem('theme', newTheme);
    });

    // Observe elements with animation classes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up, .slide-in, .section-content').forEach(el => {
        observer.observe(el);
    });

    // Add hover effect to cards
    document.querySelectorAll('.expertise-card, .interest-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Card flip functionality
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove flipped class from all other cards
            document.querySelectorAll('.experience-card').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('flipped');
                }
            });
            // Toggle the clicked card
            this.classList.toggle('flipped');
        });
    });

    // Interests scroll functionality
    const interestsGrid = document.querySelector('.interests-grid');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    if (scrollLeftBtn && scrollRightBtn && interestsGrid) {
        const cardWidth = 300; // Width of each card
        const scrollAmount = cardWidth + 16; // Card width + gap
        
        scrollLeftBtn.addEventListener('click', () => {
            interestsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            interestsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Optional: Hide scroll buttons when not needed
        const checkScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = interestsGrid;
            scrollLeftBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            scrollRightBtn.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0.5';
        };
        
        interestsGrid.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll(); // Initial check
    }

    // Quote animation
    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });

    document.querySelectorAll('.quote-container').forEach(el => {
        quoteObserver.observe(el);
    });

    // Observe expertise cards
    document.querySelectorAll('.expertise-card').forEach(card => {
        observer.observe(card);
    });

    // Add this window resize event listener at the end of your DOMContentLoaded event
    window.addEventListener('resize', () => {
        const interestsGrid = document.querySelector('.interests-grid');
        if (window.innerWidth > 768) {
            interestsGrid.style.display = 'grid';
            interestsGrid.style.overflow = 'visible';
        } else {
            interestsGrid.style.display = 'flex';
            interestsGrid.style.overflowX = 'auto';
        }
    });

    // Single card flip functionality implementation
    const cards = document.querySelectorAll('.experience-card');
    console.log('Found cards:', cards.length); // Debug log
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card clicked'); // Debug log
            // Remove flipped class from all other cards
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('flipped');
                }
            });
            // Toggle the clicked card
            this.classList.toggle('flipped');
        });
    });

    // Log to check if script is loading
    console.log('Script loaded');
    
    // Check if cards exist
    console.log('Found cards:', cards.length);
    
    // Add flip functionality
    cards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Card clicked');
            card.classList.toggle('flipped');
        });
    });

    // Mobile Menu Implementation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('show') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-toggle')) {
                navLinks.classList.remove('show');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }
});

// Add animation classes to elements
document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('gradient-text');
});

document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.setProperty('--delay', index);
});

document.querySelectorAll('.experience-card').forEach((el, index) => {
    el.classList.add('slide-in');
    el.style.setProperty('--delay', index);
});

// Smooth section transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adding offset for the fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // If it's the mobile menu, close it after clicking
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Handle active state for nav links
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Update active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Add form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    fetch('https://formsubmit.co/ajax/tmulagada.3@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'thank-you.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});