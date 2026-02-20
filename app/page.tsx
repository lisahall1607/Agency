'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<FormStatus>('idle');
  const [bookingStatus, setBookingStatus] = useState<FormStatus>('idle');
  const contactFormRef = useRef<HTMLFormElement>(null);
  const bookingFormRef = useRef<HTMLFormElement>(null);

  const today = new Date().toISOString().split('T')[0];

  // Smooth scroll handler
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === '#contact-form') return;
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (href === '#' || href === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        const offsetTop =
          target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    },
    []
  );

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormRef.current) return;
    setContactStatus('sending');

    const formData = new FormData(contactFormRef.current);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: data.name,
          email: data.email,
          company: data.company || '',
          message: data.message,
        }),
      });
      if (!response.ok) throw new Error('Failed to send');
      setContactStatus('success');
      contactFormRef.current.reset();
      setTimeout(() => setContactStatus('idle'), 3000);
    } catch {
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 3000);
    }
  };

  // Booking form submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormRef.current) return;
    setBookingStatus('sending');

    const formData = new FormData(bookingFormRef.current);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: data.name,
          email: data.email,
          date: data.date,
          time: data.time,
          message: data.message || '',
        }),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setBookingStatus('success');
      bookingFormRef.current.reset();
      setTimeout(() => {
        setIsModalOpen(false);
        setBookingStatus('idle');
      }, 2000);
    } catch {
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 3000);
    }
  };

  // All scroll/animation/interaction effects
  useEffect(() => {
    // --- Navbar scroll effect ---
    const nav = document.querySelector('.nav') as HTMLElement | null;
    const handleNavScroll = () => {
      if (!nav) return;
      if (window.pageYOffset > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
      } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
      }
    };

    // --- Intersection Observer for fade-in animations ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setTimeout(() => {
              (entry.target as HTMLElement).style.transitionDelay = '';
            }, 1000);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animateElements = document.querySelectorAll(
      '.service-card, .project-card, .process-step, .testimonial-card, .section-header'
    );
    animateElements.forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    // Stagger animations
    document.querySelectorAll('.service-card').forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
    });
    document.querySelectorAll('.project-card').forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
    });

    // --- Parallax ---
    const heroContent = document.querySelector(
      '.hero-content'
    ) as HTMLElement | null;
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    let parallaxTicking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${rate * 0.3}px)`;
        heroContent.style.opacity = String(Math.max(0.3, 1 - scrolled / 600));
      } else if (heroContent) {
        heroContent.style.opacity = '0.3';
      }
      if (scrolled < 1000) {
        gradientOrbs.forEach((orb, i) => {
          const speed = (i + 1) * 0.2;
          (orb as HTMLElement).style.transform = `translate(${rate * speed}px, ${rate * speed * 0.5}px)`;
        });
      }
      parallaxTicking = false;
    };

    const handleParallax = () => {
      if (!parallaxTicking) {
        window.requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    };

    // --- Scroll progress bar ---
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
      position: fixed; top: 0; left: 0; width: 0%;
      height: 2px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
      z-index: 10000; transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    let progressTicking = false;
    const updateProgress = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      scrollProgress.style.width =
        Math.min(100, (window.pageYOffset / total) * 100) + '%';
      progressTicking = false;
    };
    const handleProgress = () => {
      if (!progressTicking) {
        window.requestAnimationFrame(updateProgress);
        progressTicking = true;
      }
    };

    // --- Hero headline animation ---
    const heroHeadline = document.querySelector(
      '.hero-headline'
    ) as HTMLElement | null;
    if (heroHeadline) {
      heroHeadline.style.opacity = '0';
      heroHeadline.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heroHeadline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroHeadline.style.opacity = '1';
        heroHeadline.style.transform = 'translateY(0)';
      }, 300);
    }

    // --- Custom cursor (desktop) ---
    let cursorEl: HTMLDivElement | null = null;
    if (window.innerWidth > 768) {
      cursorEl = document.createElement('div');
      cursorEl.style.cssText = `
        width: 20px; height: 20px; border: 2px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999;
        transition: transform 0.1s ease; display: none;
      `;
      document.body.appendChild(cursorEl);

      const onMouseMove = (e: MouseEvent) => {
        if (cursorEl) {
          cursorEl.style.display = 'block';
          cursorEl.style.left = e.clientX - 10 + 'px';
          cursorEl.style.top = e.clientY - 10 + 'px';
        }
      };
      document.addEventListener('mousemove', onMouseMove);

      document
        .querySelectorAll('a, button, .service-card, .project-card')
        .forEach((el) => {
          el.addEventListener('mouseenter', () => {
            if (cursorEl) {
              cursorEl.style.transform = 'scale(1.5)';
              cursorEl.style.borderColor = 'rgba(99, 102, 241, 0.8)';
            }
          });
          el.addEventListener('mouseleave', () => {
            if (cursorEl) {
              cursorEl.style.transform = 'scale(1)';
              cursorEl.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            }
          });
        });
    }

    // --- Service card 3D hover (desktop) ---
    if (window.innerWidth > 768) {
      document.querySelectorAll('.service-card').forEach((card) => {
        let isHovering = false;
        let animDone = false;
        const interval = setInterval(() => {
          if (card.classList.contains('visible')) {
            setTimeout(() => {
              animDone = true;
              clearInterval(interval);
            }, 800);
          }
        }, 100);

        card.addEventListener('mouseenter', () => {
          isHovering = true;
        });
        card.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent;
          if (!isHovering || !animDone) return;
          const rect = (card as HTMLElement).getBoundingClientRect();
          const rotateX =
            (me.clientY - rect.top - rect.height / 2) / 15;
          const rotateY = (rect.width / 2 - (me.clientX - rect.left)) / 15;
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
          isHovering = false;
          (card as HTMLElement).style.transform = '';
        });
      });
    }

    // --- Project card hover ---
    document.querySelectorAll('.project-card').forEach((card) => {
      const image = card.querySelector('.project-image') as HTMLElement | null;
      let isHovering = false;
      card.addEventListener('mouseenter', () => {
        isHovering = true;
      });
      card.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent;
        if (!isHovering || !image) return;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const moveX = (me.clientX - rect.left - rect.width / 2) / 25;
        const moveY = (me.clientY - rect.top - rect.height / 2) / 25;
        if (card.classList.contains('visible')) {
          image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }
      });
      card.addEventListener('mouseleave', () => {
        isHovering = false;
        if (image) image.style.transform = '';
      });
    });

    // --- Process step animation ---
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const icon = entry.target.querySelector(
              '.step-icon'
            ) as HTMLElement | null;
            if (icon) icon.style.animation = 'scaleIn 0.6s ease';
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.process-step').forEach((s) => stepObserver.observe(s));

    // --- Event listeners ---
    window.addEventListener('scroll', handleNavScroll);
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('scroll', handleProgress);

    // --- Console easter egg ---
    console.log(
      '%c\uD83D\uDC4B Hello! Interested in working together?',
      'font-size: 16px; color: #6366f1; font-weight: bold;'
    );
    console.log(
      '%cGet in touch: hello@modulrus.com',
      'font-size: 12px; color: #a0a0a0;'
    );

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleNavScroll);
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('scroll', handleProgress);
      observer.disconnect();
      stepObserver.disconnect();
      scrollProgress.remove();
      cursorEl?.remove();
    };
  }, []);

  // Escape key to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

  // Body overflow for modal
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Button display helpers
  const contactBtnText: Record<FormStatus, string> = {
    idle: 'Send Message',
    sending: 'Sending...',
    success: 'Message Sent!',
    error: 'Error - Please try again',
  };
  const bookingBtnText: Record<FormStatus, string> = {
    idle: 'Confirm Booking',
    sending: 'Submitting...',
    success: 'Booking Confirmed!',
    error: 'Error - Please try again',
  };
  const statusStyle = (status: FormStatus): React.CSSProperties => {
    if (status === 'success')
      return { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' };
    if (status === 'error')
      return { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' };
    return {};
  };

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <a
              href="#top"
              className="logo"
              aria-label="Scroll to top"
              onClick={(e) => handleAnchorClick(e, '#top')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Modulr" className="logo-icon" />
              <span>Modulr</span>
            </a>
            <div className={`nav-links${isMobileMenuOpen ? ' active' : ''}`}>
              <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Services</a>
              <a href="#work" onClick={(e) => handleAnchorClick(e, '#work')}>Work</a>
              <a href="#process" onClick={(e) => handleAnchorClick(e, '#process')}>Process</a>
              <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a>
              <a href="#contact" className="btn-primary" onClick={(e) => handleAnchorClick(e, '#contact')}>Start a Project</a>
            </div>
            <button
              className={`mobile-menu-toggle${isMobileMenuOpen ? ' active' : ''}`}
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="grid-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-headline">
              We design &amp; build<br />
              <span className="gradient-text">digital products</span><br />
              that scale
            </h1>
            <p className="hero-subhead">
              Partnering with ambitious startups and established companies to create
              exceptional digital experiences that drive growth and engagement.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary" onClick={(e) => handleAnchorClick(e, '#contact')}>Start a Project</a>
              <a href="#work" className="btn btn-secondary" onClick={(e) => handleAnchorClick(e, '#work')}>View Work</a>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Services</h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>Website Design &amp; Development</h3>
              <p>Custom websites that combine stunning design with high-performance engineering. From landing pages to complex web applications.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18.01" />
                </svg>
              </div>
              <h3>Web &amp; Mobile App Development</h3>
              <p>Native and cross-platform mobile applications, plus progressive web apps. Built for scale, performance, and user delight.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3>Product Strategy &amp; UX Research</h3>
              <p>Data-driven product strategy and user research to ensure your product solves real problems and delivers measurable results.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                </svg>
              </div>
              <h3>Design Systems &amp; UI Engineering</h3>
              <p>Comprehensive design systems and component libraries that ensure consistency, speed up development, and scale with your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="case-studies">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="device-mockup">
                  <div className="browser-frame">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <span></span><span></span><span></span>
                      </div>
                      <div className="browser-url">tryflowly.us</div>
                    </div>
                    <iframe
                      src="https://www.tryflowly.us/"
                      className="website-preview"
                      loading="lazy"
                      title="TryFlowly Preview"
                      allow="fullscreen"
                    ></iframe>
                  </div>
                </div>
                <div className="project-overlay">
                  <span className="project-category">Web App</span>
                  <a href="https://www.tryflowly.us/" target="_blank" rel="noopener noreferrer" className="project-link">Visit Website →</a>
                </div>
              </div>
              <div className="project-info">
                <h3>TryFlowly</h3>
                <p>Live Pilates &amp; Yoga platform connecting students with world-class instructors. Features real-time classes, instructor profiles, and seamless booking system for wellness transformation.</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="device-mockup">
                  <div className="browser-frame">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <span></span><span></span><span></span>
                      </div>
                      <div className="browser-url">dalmatianrescue.com</div>
                    </div>
                    <iframe
                      src="https://www.dalmatianrescue.com/"
                      className="website-preview"
                      loading="lazy"
                      title="Dalmatian Rescue Preview"
                      allow="fullscreen"
                    ></iframe>
                  </div>
                </div>
                <div className="project-overlay">
                  <span className="project-category">Website</span>
                  <a href="https://www.dalmatianrescue.com/" target="_blank" rel="noopener noreferrer" className="project-link">Visit Website →</a>
                </div>
              </div>
              <div className="project-info">
                <h3>Dalmatian Rescue SoFL</h3>
                <p>Compassionate animal rescue website featuring adoption process, available dogs, and community resources. Built to help every spotted heart find a loving home.</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="device-mockup">
                  <div className="browser-frame">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <span></span><span></span><span></span>
                      </div>
                      <div className="browser-url">fosterfi.com</div>
                    </div>
                    <iframe
                      src="https://contatoheloisaroma.wixsite.com/mysite"
                      className="website-preview"
                      loading="lazy"
                      title="FosterFi Preview"
                      allow="fullscreen"
                    ></iframe>
                  </div>
                </div>
                <div className="project-overlay">
                  <span className="project-category">Web App</span>
                  <a href="https://contatoheloisaroma.wixsite.com/mysite" target="_blank" rel="noopener noreferrer" className="project-link">Visit Website →</a>
                </div>
              </div>
              <div className="project-info">
                <h3>FosterFi</h3>
                <p>Community platform for animal rescue organizations. Streamlines foster networks, tracks expenses, manages donations, and connects volunteers to scale rescue operations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How We Work</span>
            <h2 className="section-title">Our Process</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3>Research &amp; Discovery</h3>
              <p>We start by understanding your business goals, target audience, and market landscape to identify opportunities and define the project scope.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Strategy &amp; Planning</h3>
              <p>We develop user journeys, information architecture, and a comprehensive product strategy that aligns with your business objectives and user needs.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3>Design &amp; Prototyping</h3>
              <p>We create beautiful, intuitive interfaces and build interactive prototypes to validate design concepts and gather feedback before development begins.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Development &amp; Launch</h3>
              <p>We build your product using modern technologies and best practices, then launch it with ongoing support to ensure success and scalability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-label">About Us</span>
              <h2 className="section-title">Why Partner With Us</h2>
              <p className="about-description">
                We&apos;re a team of designers, developers, and product strategists who are passionate about
                creating digital products that make a difference. With a focus on collaboration, product
                thinking, and measurable results, we&apos;ve helped launch 50+ products for startups and
                established companies worldwide.
              </p>
              <p className="about-description">
                Our approach combines deep technical expertise with strategic thinking and exceptional
                design. We don&apos;t just build products—we help you build businesses.
              </p>
              <div className="about-metrics">
                <div className="metric">
                  <div className="metric-number">50+</div>
                  <div className="metric-label">Products Launched</div>
                </div>
                <div className="metric">
                  <div className="metric-number">30+</div>
                  <div className="metric-label">Global Clients</div>
                </div>
                <div className="metric">
                  <div className="metric-number">8</div>
                  <div className="metric-label">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="testimonial-text">
                &quot;Modulr transformed our product vision into reality. Their attention to detail,
                technical expertise, and collaborative approach made the entire process seamless.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-name">Sarah Chen</div>
                <div className="author-role">CEO, TechStart Inc.</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="testimonial-text">
                &quot;Working with Modulr was a game-changer. They didn&apos;t just build a website—they
                built a digital experience that our customers love and that drives real business results.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-name">Michael Rodriguez</div>
                <div className="author-role">Founder, CommerceFlow</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="testimonial-text">
                &quot;The team&apos;s product thinking and design expertise helped us launch faster and
                with more confidence. Highly recommend for any ambitious product team.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-name">Emily Watson</div>
                <div className="author-role">Product Lead, InnovateCo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Something Great?</h2>
            <p className="cta-subtitle">Let&apos;s discuss your project and explore how we can help bring your vision to life.</p>
            <div className="cta-actions">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Book a Call</button>
            </div>
            <form ref={contactFormRef} onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell us about your project</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={contactStatus === 'sending'}
                style={statusStyle(contactStatus)}
              >
                {contactBtnText[contactStatus]}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a href="#top" className="logo" aria-label="Scroll to top" onClick={(e) => handleAnchorClick(e, '#top')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="Modulr" className="logo-icon" />
                <span>Modulr</span>
              </a>
              <p>Designing and building digital products that scale.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Services</h4>
                <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Web Development</a>
                <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Mobile Apps</a>
                <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Product Strategy</a>
                <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Design Systems</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a>
                <a href="#work" onClick={(e) => handleAnchorClick(e, '#work')}>Work</a>
                <a href="#process" onClick={(e) => handleAnchorClick(e, '#process')}>Process</a>
                <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Dribbble</a>
                <a href="mailto:hello@modulrus.com">Email</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Modulr. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <div className={`booking-modal${isModalOpen ? ' active' : ''}`}>
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
        <div className="modal-content">
          <button className="modal-close" aria-label="Close modal" onClick={() => setIsModalOpen(false)}>&times;</button>
          <h2 className="modal-title">Book a Call</h2>
          <p className="modal-subtitle">Select a date and time that works for you</p>

          <form ref={bookingFormRef} onSubmit={handleBookingSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="booking-name">Name</label>
              <input type="text" id="booking-name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="booking-email">Email</label>
              <input type="email" id="booking-email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="booking-date">Select Date</label>
              <input type="date" id="booking-date" name="date" required min={today} />
            </div>
            <div className="form-group">
              <label htmlFor="booking-time">Select Time</label>
              <select id="booking-time" name="time" required defaultValue="">
                <option value="" disabled>Choose a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="booking-message">Message (Optional)</label>
              <textarea id="booking-message" name="message" rows={3}></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={bookingStatus === 'sending'}
              style={statusStyle(bookingStatus)}
            >
              {bookingBtnText[bookingStatus]}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
