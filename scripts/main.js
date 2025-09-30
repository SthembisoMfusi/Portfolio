// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Form submission animation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission

            const button = this.querySelector('button[type="submit"]');
            const btnText = button.querySelector('.btn-text');
            const loading = button.querySelector('.loading');
            const formData = new FormData(this);

            // Show loading state
            btnText.style.display = 'none';
            loading.style.display = 'inline-block';
            button.disabled = true;

            try {
                // Send form data to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {

                    btnText.textContent = 'Message Sent! ✓';
                    btnText.style.color = '#27ae60';
                    this.reset();


                    showNotification('Message sent successfully!', 'success');

                } else {
                    throw new Error('Form submission failed');
                }

            } catch (error) {
                console.error('Error:', error);
                btnText.textContent = 'Failed to send. Try again.';
                btnText.style.color = '#e74c3c';
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {

                loading.style.display = 'none';
                btnText.style.display = 'inline';
                button.disabled = false;

                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    btnText.style.color = '';
                }, 3000);
            }
        });
    }
});
// Add smooth scrolling for any internal links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Add interactive hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Dynamic background particles
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;

    document.body.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 5000);
}

// Create particles periodically
document.addEventListener('DOMContentLoaded', function() {
    setInterval(createParticle, 300);
});

// Add typing effect completion
document.addEventListener('DOMContentLoaded', function() {
    const subtitle = document.querySelector('.subtitle');
    
    // Create a hidden element to measure the text width
    if (subtitle) {
        const measurer = document.createElement('span');
        measurer.style.visibility = 'hidden';
        measurer.style.position = 'absolute';
        measurer.style.whiteSpace = 'nowrap';
        measurer.style.fontSize = getComputedStyle(subtitle).fontSize;
        measurer.style.fontFamily = getComputedStyle(subtitle).fontFamily;
        measurer.textContent = subtitle.textContent;
        document.body.appendChild(measurer);
        
        const textWidth = measurer.offsetWidth;
        document.body.removeChild(measurer);
        
        // Stop the typing animation at the exact text width
        setTimeout(() => {
            subtitle.style.width = textWidth + 'px';
            subtitle.style.borderRight = 'none';
            subtitle.style.animation = 'none';
        }, 4500);
    }
});

// Enhanced skill hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('#skills li');

    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(2deg)';
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.zIndex = '1';
        });
    });
});

// Add click ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('button, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for background
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const background = document.body;
        if (background) {
            background.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Add loading animation for the entire page
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing loading screens
    const existingLoader = document.querySelector('.page-loader');
    if (existingLoader) {
        existingLoader.remove();
    }

    // Animate sections in sequence
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 200);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.3)';
            } else {
                this.style.borderColor = '#27ae60';
                this.style.boxShadow = '0 0 10px rgba(39, 174, 96, 0.3)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.3)';
        });
    });
});

// Mouse trail effect - REMOVED per user request

// Scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Add CSS for scroll progress
const scrollProgressStyle = document.createElement('style');
scrollProgressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c);
        z-index: 10000;
        transition: width 0.2s ease;
    }
`;
document.head.appendChild(scrollProgressStyle);

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Skill tags interactive tooltip
document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('#skills li');
    
    skills.forEach(skill => {
        skill.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Add a small animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
});

// Add notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fa ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #27ae60;
    }
    
    .notification-success i {
        color: #27ae60;
        font-size: 1.3em;
    }
    
    .notification-error {
        border-left: 4px solid #e74c3c;
    }
    
    .notification-error i {
        color: #e74c3c;
        font-size: 1.3em;
    }
    
    .notification span {
        color: #333;
        font-weight: 500;
    }
`;
document.head.appendChild(notificationStyle);

// Add "Back to Top" button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fa fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add CSS for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #3498db, #2980b9);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2em;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
    }
    
    .back-to-top.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 25px rgba(52, 152, 219, 0.6);
    }
`;
document.head.appendChild(backToTopStyle);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all project cards and skill items
    document.querySelectorAll('.project-card, #skills li, .stat-card').forEach(el => {
        animateOnScroll.observe(el);
    });
});

// Add CSS for scroll animations
const scrollAnimStyle = document.createElement('style');
scrollAnimStyle.textContent = `
    .project-card, #skills li, .stat-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .project-card.animated, #skills li.animated, .stat-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimStyle);

// Add confetti effect on resume download
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.querySelector('.resume-download');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            createConfetti(e.clientX, e.clientY);
            showNotification('Resume download started!', 'success');
        });
    }
});

function createConfetti(x, y) {
    const colors = ['#3498db', '#e74c3c', '#f39c12', '#27ae60', '#9b59b6'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        confetti.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }
}

// Add CSS for confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    .confetti {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: confettiFall 1s ease-out forwards;
    }
    
    @keyframes confettiFall {
        to {
            transform: translate(var(--tx), var(--ty)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);