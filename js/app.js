/**
 * Main Application Script
 * Handles general site functionality
 */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar-menu a');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) &&
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

