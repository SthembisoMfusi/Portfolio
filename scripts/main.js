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
    setTimeout(() => {
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            subtitle.style.width = '100%';
            subtitle.style.borderRight = 'none';
        }
    }, 3000);
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