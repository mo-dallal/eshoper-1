// EShopper Main JavaScript File
// Features: Scroll Navbar, Modal System, Cart Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // SCROLL NAVBAR FUNCTIONALITY
    // ===========================================
    
    const navbar = document.querySelector('.navbar');
    const topbar = document.querySelector('.container-fluid .row:first-child');
    const logo = document.querySelector('.navbar-brand, .text-decoration-none h1');
    
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            // Add scrolled class for styling
            navbar.classList.add('navbar-scrolled');
            if (topbar) topbar.style.display = 'none';
            
            // Add shadow and background
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.transition = 'all 0.3s ease';
            
        } else {
            // Remove scrolled class
            navbar.classList.remove('navbar-scrolled');
            if (topbar) topbar.style.display = 'block';
            
            // Remove shadow and background
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
        
        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // ===========================================
    // MODAL SYSTEM
    // ===========================================
    
    // Product Quick View Modal
    function createProductModal() {
        const modalHTML = `
            <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="productModalLabel">Product Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img id="modalProductImage" src="" alt="Product" class="img-fluid rounded">
                                </div>
                                <div class="col-md-6">
                                    <h4 id="modalProductName"></h4>
                                    <div class="d-flex align-items-center mb-3">
                                        <h5 class="text-primary me-3" id="modalProductPrice"></h5>
                                        <h6 class="text-muted" id="modalProductOldPrice"></h6>
                                    </div>
                                    <p id="modalProductDescription" class="text-muted mb-4"></p>
                                    
                                    <!-- Size Selection -->
                                    <div class="mb-3">
                                        <label class="form-label">Size:</label>
                                        <div class="btn-group" role="group">
                                            <input type="radio" class="btn-check" name="size" id="sizeS" value="S">
                                            <label class="btn btn-outline-primary" for="sizeS">S</label>
                                            
                                            <input type="radio" class="btn-check" name="size" id="sizeM" value="M" checked>
                                            <label class="btn btn-outline-primary" for="sizeM">M</label>
                                            
                                            <input type="radio" class="btn-check" name="size" id="sizeL" value="L">
                                            <label class="btn btn-outline-primary" for="sizeL">L</label>
                                            
                                            <input type="radio" class="btn-check" name="size" id="sizeXL" value="XL">
                                            <label class="btn btn-outline-primary" for="sizeXL">XL</label>
                                        </div>
                                    </div>
                                    
                                    <!-- Quantity -->
                                    <div class="mb-4">
                                        <label class="form-label">Quantity:</label>
                                        <div class="input-group" style="width: 120px;">
                                            <button class="btn btn-outline-secondary" type="button" id="quantityMinus">-</button>
                                            <input type="number" class="form-control text-center" value="1" min="1" id="quantityInput">
                                            <button class="btn btn-outline-secondary" type="button" id="quantityPlus">+</button>
                                        </div>
                                    </div>
                                    
                                    <!-- Action Buttons -->
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-primary btn-lg" id="addToCartModal">
                                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                        </button>
                                        <button class="btn btn-outline-primary">
                                            <i class="fas fa-heart me-2"></i>Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Initialize modal
    createProductModal();
    
    // Product data (you can expand this with real data)
    const productData = {
        'product-1': {
            name: 'Colorful Stylish Dress',
            price: '$120',
            oldPrice: '$250',
            image: './assets/img/product-1.jpg',
            description: 'A beautiful and stylish dress perfect for any occasion. Made with high-quality materials and designed for comfort and elegance.'
        },
        'product-2': {
            name: 'Boys Shirt',
            price: '$50',
            oldPrice: '$100',
            image: './assets/img/product-2.jpg',
            description: 'Comfortable and stylish shirt for boys. Perfect for casual wear and school. Made with soft cotton material.'
        },
        'product-3': {
            name: 'Mens Jackets',
            price: '$200',
            oldPrice: '$350',
            image: './assets/img/product-3.jpg',
            description: 'Premium quality jacket for men. Perfect for winter season. Features modern design and excellent craftsmanship.'
        },
        'product-4': {
            name: 'Mens Suits',
            price: '$100',
            oldPrice: '$150',
            image: './assets/img/product 4.png',
            description: 'Elegant and professional suit for men. Perfect for business meetings and formal occasions.'
        }
    };
    
    // Handle "View Detail" clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('a[href=""]') && e.target.closest('a[href=""]').textContent.includes('View Detail')) {
            e.preventDefault();
            
            const productCard = e.target.closest('.product-item');
            const productImage = productCard.querySelector('img');
            const productName = productCard.querySelector('h6').textContent;
            const priceElement = productCard.querySelector('h6:not(.text-muted)');
            const oldPriceElement = productCard.querySelector('.text-muted del');
            
            // Get product key from image src
            const imageSrc = productImage.src;
            const productKey = imageSrc.split('/').pop().split('.')[0];
            
            // Populate modal with product data
            const product = productData[productKey] || {
                name: productName,
                price: priceElement ? priceElement.textContent : '$0',
                oldPrice: oldPriceElement ? oldPriceElement.textContent : '',
                image: imageSrc,
                description: 'Product description not available.'
            };
            
            document.getElementById('modalProductImage').src = product.image;
            document.getElementById('modalProductName').textContent = product.name;
            document.getElementById('modalProductPrice').textContent = product.price;
            document.getElementById('modalProductOldPrice').textContent = product.oldPrice;
            document.getElementById('modalProductDescription').textContent = product.description;
            
            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('productModal'));
            modal.show();
        }
    });
    
    // Quantity controls in modal
    document.addEventListener('click', function(e) {
        if (e.target.id === 'quantityPlus') {
            const input = document.getElementById('quantityInput');
            input.value = parseInt(input.value) + 1;
        }
        if (e.target.id === 'quantityMinus') {
            const input = document.getElementById('quantityInput');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }
    });
    
    // ===========================================
    // CART FUNCTIONALITY
    // ===========================================
    
    let cartItems = [];
    let cartCount = 0;
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('a[href=""]') && e.target.closest('a[href=""]').textContent.includes('Add To Cart')) {
            e.preventDefault();
            
            const productCard = e.target.closest('.product-item');
            const productName = productCard.querySelector('h6').textContent;
            const priceElement = productCard.querySelector('h6:not(.text-muted)');
            const productImage = productCard.querySelector('img').src;
            
            const product = {
                id: Date.now(),
                name: productName,
                price: priceElement ? priceElement.textContent : '$0',
                image: productImage,
                quantity: 1
            };
            
            cartItems.push(product);
            cartCount++;
            updateCartUI();
            showAddToCartNotification(product.name);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartModal') {
            const productName = document.getElementById('modalProductName').textContent;
            const productPrice = document.getElementById('modalProductPrice').textContent;
            const productImage = document.getElementById('modalProductImage').src;
            const quantity = parseInt(document.getElementById('quantityInput').value);
            const selectedSize = document.querySelector('input[name="size"]:checked').value;
            
            const product = {
                id: Date.now(),
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity,
                size: selectedSize
            };
            
            cartItems.push(product);
            cartCount += quantity;
            updateCartUI();
            showAddToCartNotification(product.name);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
            modal.hide();
        }
    });
    
    function updateCartUI() {
        const cartBadges = document.querySelectorAll('.badge');
        cartBadges.forEach(badge => {
            if (badge.textContent === '0' || !isNaN(badge.textContent)) {
                badge.textContent = cartCount;
            }
        });
    }
    
    function showAddToCartNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>${productName}</strong> added to cart!
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // ===========================================
    // SEARCH FUNCTIONALITY
    // ===========================================
    
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-item');
            
            productCards.forEach(card => {
                const productName = card.querySelector('h6').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ===========================================
    // BACK TO TOP BUTTON
    // ===========================================
    
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===========================================
    
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
    
    // ===========================================
    // LOADING ANIMATION
    // ===========================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===========================================
    // MOBILE MENU ENHANCEMENTS
    // ===========================================
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
        
        // Close mobile menu when clicking on a link
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // ===========================================
    // PERFECT HERO CAROUSEL
    // ===========================================
    
    class PerfectCarousel {
        constructor(container) {
            this.container = container;
            this.slides = container.querySelectorAll('.carousel-slide');
            this.indicators = container.querySelectorAll('.indicator');
            this.prevBtn = container.querySelector('.carousel-prev');
            this.nextBtn = container.querySelector('.carousel-next');
            this.progressBar = container.querySelector('.progress-bar');
            
            this.currentIndex = 0;
            this.totalSlides = this.slides.length;
            this.autoPlayInterval = null;
            this.progressInterval = null;
            this.isTransitioning = false;
            this.autoPlayDelay = 6000; // 6 seconds
            
            this.init();
        }
        
        init() {
            this.setupEventListeners();
            this.startAutoPlay();
            this.updateProgress();
            this.animateSlideContent();
        }
        
        setupEventListeners() {
            // Navigation buttons
            this.prevBtn.addEventListener('click', () => this.previousSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Indicators
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });
            
            // Touch/swipe support
            this.setupTouchEvents();
            
            // Pause on hover
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        setupTouchEvents() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            
            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            
            this.container.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                
                const diffX = startX - endX;
                const diffY = startY - endY;
                const threshold = 50;
                
                // Only trigger if horizontal swipe is greater than vertical
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.previousSlide();
                    }
                }
            });
        }
        
        nextSlide() {
            if (this.isTransitioning) return;
            
            const nextIndex = (this.currentIndex + 1) % this.totalSlides;
            this.goToSlide(nextIndex);
        }
        
        previousSlide() {
            if (this.isTransitioning) return;
            
            const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
            this.goToSlide(prevIndex);
        }
        
        goToSlide(index) {
            if (this.isTransitioning || index === this.currentIndex) return;
            
            this.isTransitioning = true;
            this.pauseAutoPlay();
            
            // Remove active class from current slide
            this.slides[this.currentIndex].classList.remove('active');
            this.indicators[this.currentIndex].classList.remove('active');
            
            // Add active class to new slide
            this.slides[index].classList.add('active');
            this.indicators[index].classList.add('active');
            
            this.currentIndex = index;
            
            // Animate content
            this.animateSlideContent();
            
            // Reset progress
            this.updateProgress();
            
            // Resume auto-play after transition
            setTimeout(() => {
                this.isTransitioning = false;
                this.startAutoPlay();
            }, 800);
        }
        
        animateSlideContent() {
            const activeSlide = this.slides[this.currentIndex];
            const slideText = activeSlide.querySelector('.slide-text');
            
            if (slideText) {
                // Reset animations
                slideText.style.animation = 'none';
                slideText.offsetHeight; // Trigger reflow
                
                // Restart animations
                slideText.style.animation = null;
                
                // Animate each element with delay
                const elements = slideText.querySelectorAll('.slide-badge, .slide-title, .slide-description, .slide-btn');
                elements.forEach((element, index) => {
                    element.style.animation = 'none';
                    element.offsetHeight;
                    element.style.animation = `slideInUp 1s ease-out ${0.1 + (index * 0.2)}s both`;
                });
            }
        }
        
        startAutoPlay() {
            this.pauseAutoPlay();
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
            
            this.startProgress();
        }
        
        pauseAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
            this.stopProgress();
        }
        
        startProgress() {
            this.stopProgress();
            let progress = 0;
            const increment = 100 / (this.autoPlayDelay / 100);
            
            this.progressInterval = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    progress = 100;
                    this.stopProgress();
                }
                this.progressBar.style.width = progress + '%';
            }, 100);
        }
        
        stopProgress() {
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }
        }
        
        updateProgress() {
            this.progressBar.style.width = '0%';
        }
    }
    
    // Initialize the perfect carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        new PerfectCarousel(heroCarousel);
        console.log('Perfect Hero Carousel initialized successfully!');
    }
    
    console.log('EShopper JavaScript loaded successfully!');
});

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
