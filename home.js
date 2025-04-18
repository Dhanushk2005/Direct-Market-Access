// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        // Toggle between light and dark themes
        if (body.classList.contains('light')) {
            body.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Initialize the theme on page load
    if (!body.classList.contains('light') && !body.classList.contains('dark')) {
        body.classList.add(savedTheme);
    }
    
    // Filter tags functionality
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Here you would typically filter content based on the selected tag
            const filterValue = this.textContent;
            console.log(`Filter applied: ${filterValue}`);
            // Future implementation would filter products/farmers based on this value
        });
    });
    
    // Animated elements on scroll
    const animatedElements = document.querySelectorAll('.animated');
    
    // Simple animation on scroll function
    function checkScroll() {
        animatedElements.forEach(el => {
            const elPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elPosition < screenPosition) {
                el.classList.add('appear');
            }
        });
    }
    
    // Run once on page load
    checkScroll();
    
    // Run on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = searchInput ? searchInput.nextElementSibling : null;
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchValue = searchInput.value.trim();
            if (searchValue) {
                console.log(`Searching for: ${searchValue}`);
                // Future implementation would perform search with this value
                alert(`Search functionality will be implemented soon! You searched for: ${searchValue}`);
            }
        });
        
        // Also trigger search on Enter key
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                console.log(`Newsletter subscription for: ${email}`);
                alert(`Thanks for subscribing with ${email}! You'll receive our updates soon.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Simulate loading for heatmap section
    const loadingLine = document.querySelector('.loading-line');
    if (loadingLine) {
        loadingLine.classList.add('loading');
        setTimeout(() => {
            loadingLine.classList.remove('loading');
            loadingLine.classList.add('loaded');
        }, 1500);
    }
    
    // Mobile menu functionality (assuming there would be a mobile menu toggle)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('header .container');
    const nav = document.querySelector('header nav');
    
    if (header && nav) {
        header.insertBefore(mobileMenuToggle, nav);
        
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            this.classList.toggle('active');
        });
    }
    
    // Responsive adjustments
    function handleResponsive() {
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
            // Close mobile menu if open
            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
        }
    }
    
    // Run on load and resize
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});