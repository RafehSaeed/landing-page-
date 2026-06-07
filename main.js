// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial load animations for above-the-fold elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-up, .contact-page .fade-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // Observe all fade-up elements outside the hero and contact page
    document.querySelectorAll('.agitation .fade-up, .features .fade-up, .cta-section .fade-up, .legal-page .fade-up').forEach(el => {
        observer.observe(el);
    });

    // Form submission mock
    const buttons = document.querySelectorAll('.waitlist-form button');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = e.target.previousElementSibling;

            if (input.value && input.value.includes('@')) {
                const originalText = e.target.textContent;
                e.target.textContent = "Added to Waitlist! 🎉";
                e.target.style.backgroundColor = '#10B981'; // Green
                input.value = '';

                setTimeout(() => {
                    e.target.textContent = originalText;
                    e.target.style.backgroundColor = 'var(--primary)';
                }, 3000);
            } else {
                input.focus();
                input.style.borderColor = '#EF4444'; // Red error
                setTimeout(() => {
                    input.style.borderColor = 'rgba(74, 59, 50, 0.1)';
                }, 1000);
            }
        });
    });
});

// Early access notify form handler
function handleNotify(form) {
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const email = input.value.trim();

    if (!email || !email.includes('@')) {
        input.style.borderColor = '#EF4444';
        setTimeout(() => { input.style.borderColor = ''; }, 1000);
        return;
    }

    // Store email locally (replace with API call when backend is ready)
    const signups = JSON.parse(localStorage.getItem('bemi_early_access') || '[]');
    signups.push({ email, city: 'auto', date: new Date().toISOString() });
    localStorage.setItem('bemi_early_access', JSON.stringify(signups));

    button.textContent = "You're In! 🎉";
    button.classList.add('success');
    input.value = '';
    input.disabled = true;

    setTimeout(() => {
        button.textContent = "Notify Me";
        button.classList.remove('success');
        input.disabled = false;
    }, 4000);
}
