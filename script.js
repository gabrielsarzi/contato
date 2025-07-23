// Smooth scrolling for internal links
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
document.querySelectorAll('.about-section').forEach(section => {
    observer.observe(section);
});

// Contact form validation and submission with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    (function(){
        emailjs.init("uyX9uHWiUpeUfV2Y2");
    })();

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
                error.classList.remove('active');
            });
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;
            
            let isValid = true;
            
            // Validation
            if (!name) {
                document.getElementById('name-error').textContent = 'Por favor, insira seu nome';
                document.getElementById('name-error').classList.add('active');
                isValid = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email-error').textContent = 'Por favor, insira um e-mail válido';
                document.getElementById('email-error').classList.add('active');
                isValid = false;
            }
            if (!subject) {
                document.getElementById('subject-error').textContent = 'Por favor, selecione um assunto';
                document.getElementById('subject-error').classList.add('active');
                isValid = false;
            }
            if (!message || message.length < 10) {
                document.getElementById('message-error').textContent = 'A mensagem deve ter pelo menos 10 caracteres';
                document.getElementById('message-error').classList.add('active');
                isValid = false;
            }
            if (!consent) {
                document.getElementById('consent-error').textContent = 'Você deve concordar com o armazenamento dos dados';
                document.getElementById('consent-error').classList.add('active');
                isValid = false;
            }
            
            if (isValid) {
                try {
                    const response = await emailjs.sendForm(
                        'service_64zigrx',
                        'template_cf36lbu',
                        form,
                        'uyX9uHWiUpeUfV2Y2'
                    );
                    
                    formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    formMessage.classList.add('success');
                    form.reset();
                } catch (error) {
                    formMessage.textContent = 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.';
                    formMessage.classList.add('error');
                    console.error('Erro ao enviar:', error);
                }
            }
            
            // Button animation
            const submitBtn = form.querySelector('.course-btn');
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitBtn.style.transform = '';
            }, 150);
        });
    }
});

// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('#menu-overlay');
    const menuClose = document.querySelector('.menu-close');

    if (menuToggle && menuOverlay && menuClose) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });

        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });

        // Close menu when clicking a link
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
            }
        });
    }
});

// Add back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);