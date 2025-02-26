// Theme Switching
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Check saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // Add your form submission logic here
                const formData = new FormData(contactForm);
                // Example: Send to your backend or email service
                // await fetch('YOUR_ENDPOINT', {
                //     method: 'POST',
                //     body: formData
                // });
                
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                alert('Error sending message. Please try again.');
            }
        });
    }
}); 