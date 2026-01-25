// ============================================
// Smooth Scroll & Navigation
// ============================================

// Prevent auto-scroll to hash on page load
if (window.location.hash) {
    window.scrollTo(0, 0);
    window.history.replaceState(null, null, window.location.pathname);
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#contact-form') return;
            
            e.preventDefault();
            
            // Handle scroll to top
            if (href === '#' || href === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // Scroll Animations
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Remove transition delay after animation completes
                setTimeout(() => {
                    entry.target.style.transitionDelay = '';
                }, 1000);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animations
    const animateElements = document.querySelectorAll(
        '.service-card, .project-card, .process-step, .testimonial-card, .section-header'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ============================================
    // Parallax Effects
    // ============================================

    const heroContent = document.querySelector('.hero-content');
    const gradientOrbs = document.querySelectorAll('.gradient-orb');

    // Throttled parallax scroll handler
    let parallaxTicking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (heroContent && scrolled < 800) {
            const translateY = rate * 0.3;
            const opacity = Math.max(0.3, 1 - scrolled / 600);
            heroContent.style.transform = `translateY(${translateY}px)`;
            heroContent.style.opacity = opacity;
        } else if (heroContent && scrolled >= 800) {
            heroContent.style.opacity = '0.3';
        }

        if (scrolled < 1000) {
            gradientOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.2;
                orb.style.transform = `translate(${rate * speed}px, ${rate * speed * 0.5}px)`;
            });
        }

        parallaxTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    });

    // ============================================
    // Form Handling
    // ============================================

    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Disable button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Wait for Firebase to be ready
                if (!window.firebaseReady || typeof window.firebaseDb === 'undefined') {
                    // Wait a bit and try again
                    await new Promise(resolve => {
                        if (window.firebaseReady && window.firebaseDb) {
                            resolve();
                        } else {
                            window.addEventListener('firebase-ready', resolve, { once: true });
                            setTimeout(resolve, 2000); // Timeout after 2 seconds
                        }
                    });
                    
                    if (typeof window.firebaseDb === 'undefined') {
                        throw new Error('Firebase not initialized. Please check your Firebase configuration and refresh the page.');
                    }
                }
                
                // Import Firestore functions
                const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js');
                
                console.log('Submitting contact form to Firebase...', data);
                
                // Add contact form submission to Firestore
                const docRef = await addDoc(collection(window.firebaseDb, 'contacts'), {
                    name: data.name,
                    email: data.email,
                    company: data.company || '',
                    message: data.message,
                    createdAt: serverTimestamp(),
                    status: 'new'
                });
                
                console.log('Contact form submitted successfully! Document ID:', docRef.id);
                
                // Show success message
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            } catch (error) {
                console.error('Error submitting contact form:', error);
                submitButton.textContent = 'Error - Please try again';
                submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // ============================================
    // Cursor Effects (Optional Enhancement)
    // ============================================

    let cursor = null;
    
    // Create custom cursor if on desktop
    if (window.innerWidth > 768) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            if (cursor) {
                cursor.style.display = 'block';
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
            }
        });

        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursor) {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                }
            });
        });
    }

    // ============================================
    // Scroll Progress Indicator
    // ============================================

    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    // Throttled scroll progress
    let progressTicking = false;
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = Math.min(100, (window.pageYOffset / windowHeight) * 100);
        scrollProgress.style.width = scrolled + '%';
        progressTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            window.requestAnimationFrame(updateScrollProgress);
            progressTicking = true;
        }
    });

    // ============================================
    // Hero Headline Fade-in Animation
    // ============================================

    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        heroHeadline.style.opacity = '0';
        heroHeadline.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroHeadline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroHeadline.style.opacity = '1';
            heroHeadline.style.transform = 'translateY(0)';
        }, 300);
    }

    // ============================================
    // Service Card Hover Effects (Subtle)
    // ============================================

    // Only apply 3D effect on desktop and if not conflicting with fade-in
    if (window.innerWidth > 768) {
        const serviceCardsInteractive = document.querySelectorAll('.service-card');
        serviceCardsInteractive.forEach(card => {
            let isHovering = false;
            let animationComplete = false;
            
            // Wait for fade-in animation to complete
            const checkAnimation = setInterval(() => {
                if (card.classList.contains('visible')) {
                    setTimeout(() => {
                        animationComplete = true;
                        clearInterval(checkAnimation);
                    }, 800);
                }
            }, 100);
            
            card.addEventListener('mouseenter', function() {
                isHovering = true;
            });
            
            card.addEventListener('mousemove', function(e) {
                if (!isHovering || !animationComplete) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                isHovering = false;
                card.style.transform = '';
            });
        });
    }

    // ============================================
    // Project Card Image Parallax
    // ============================================

    const projectCardsInteractive = document.querySelectorAll('.project-card');
    projectCardsInteractive.forEach(card => {
        const image = card.querySelector('.project-image');
        let isHovering = false;
        
        card.addEventListener('mouseenter', function() {
            isHovering = true;
        });
        
        card.addEventListener('mousemove', function(e) {
            if (!isHovering || !image) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 25;
            const moveY = (y - centerY) / 25;
            
            // Only apply if card is visible
            if (card.classList.contains('visible')) {
                image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            isHovering = false;
            if (image) {
                image.style.transform = '';
            }
        });
    });

    // ============================================
    // Process Step Counter Animation
    // ============================================

    const processSteps = document.querySelectorAll('.process-step');
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIcon = entry.target.querySelector('.step-icon');
                if (stepIcon) {
                    stepIcon.style.animation = 'scaleIn 0.6s ease';
                }
            }
        });
    }, { threshold: 0.5 });

    processSteps.forEach(step => {
        stepObserver.observe(step);
    });

    // ============================================
    // Performance Optimization
    // ============================================

    // Scroll progress is already handled above
    // All scroll events are properly throttled with requestAnimationFrame

    // ============================================
    // Booking Modal
    // ============================================

    const bookCallBtn = document.getElementById('book-call-btn');
    const bookingModal = document.getElementById('booking-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const bookingForm = document.getElementById('booking-form');
    const bookingDateInput = document.getElementById('booking-date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (bookingDateInput) {
        bookingDateInput.setAttribute('min', today);
    }

    // Open modal
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    function closeModal() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Disable button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Wait for Firebase to be ready
                if (!window.firebaseReady || typeof window.firebaseDb === 'undefined') {
                    // Wait a bit and try again
                    await new Promise(resolve => {
                        if (window.firebaseReady && window.firebaseDb) {
                            resolve();
                        } else {
                            window.addEventListener('firebase-ready', resolve, { once: true });
                            setTimeout(resolve, 2000); // Timeout after 2 seconds
                        }
                    });
                    
                    if (typeof window.firebaseDb === 'undefined') {
                        throw new Error('Firebase not initialized. Please check your Firebase configuration and refresh the page.');
                    }
                }
                
                // Import Firestore functions
                const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js');
                
                console.log('Submitting booking to Firebase...', data);
                
                // Add booking to Firestore
                const docRef = await addDoc(collection(window.firebaseDb, 'bookings'), {
                    name: data.name,
                    email: data.email,
                    date: data.date,
                    time: data.time,
                    message: data.message || '',
                    createdAt: serverTimestamp(),
                    status: 'pending'
                });
                
                console.log('Booking submitted successfully! Document ID:', docRef.id);
                
                // Show success message
                submitButton.textContent = 'Booking Confirmed!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                this.reset();
                
                // Close modal after 2 seconds
                setTimeout(() => {
                    closeModal();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 2000);
            } catch (error) {
                console.error('Error submitting booking:', error);
                submitButton.textContent = 'Error - Please try again';
                submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // ============================================
    // Console Easter Egg
    // ============================================

    console.log('%c👋 Hello! Interested in working together?', 'font-size: 16px; color: #6366f1; font-weight: bold;');
    console.log('%cGet in touch: hello@modulrus.com', 'font-size: 12px; color: #a0a0a0;');
});
