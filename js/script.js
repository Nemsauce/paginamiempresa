document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    // Toggle sticky class on scroll
    const onScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', debounce(onScroll, 50));

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll functionality
    const links = document.querySelectorAll('nav ul li a, .cta-button');
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const scrollToSection = (index) => {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Adjust timeout according to the smooth scroll duration
    };

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            currentSectionIndex = [...sections].indexOf(targetSection);
            scrollToSection(currentSectionIndex);
        });
    });

    window.addEventListener('wheel', debounce((event) => {
        if (isScrolling) return;
        if (event.deltaY > 0) {
            currentSectionIndex++;
        } else {
            currentSectionIndex--;
        }
        scrollToSection(currentSectionIndex);
    }, 50));

    window.addEventListener('keydown', debounce((event) => {
        if (isScrolling) return;
        if (event.key === 'ArrowDown') {
            currentSectionIndex++;
        } else if (event.key === 'ArrowUp') {
            currentSectionIndex--;
        }
        scrollToSection(currentSectionIndex);
    }, 50));

    // Ensure the first section is visible on load
    scrollToSection(currentSectionIndex);

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Simulate form submission (e.g., send data to server)
        console.log('Form submitted:', { name, email, message });
        
        // Reset form
        contactForm.reset();
        alert('Thank you for your message. We will get back to you soon!');
    });

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});
