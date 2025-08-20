// Global Variables
let cart = [];
let products = [];
let isLoading = false;

// Product Data with Image Support
const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Premium iPhone Case",
        code: "VMG-IP001",
        price: 299,
        category: "cases",
        badge: "Best Seller",
        description: "Premium quality iPhone case with military-grade protection. Features shock-absorbing technology, precise cutouts for all ports and buttons, and wireless charging compatibility.",
        image: "https://tse1.mm.bing.net/th/id/OIP.jnwDsBp9HZEbwf47FGFksAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", // Phone case image
    },
    {
        id: 2,
        name: "Iphone Charger 20W",
        code: "VMG-WC002",
        price: 1200,
        category: "chargers",
        badge: "Fast Charging",
        description: "20W fast charging. Compatible with all iphone devices. Includes USB-C cable and wall adapter.",
        image: "https://static-01.daraz.pk/p/56949e355aa90accd38b02a3beafa56e.jpg" // Wireless charger
    },
    {
        id: 3,
        name: "Earbuds Pro",
        code: "VMG-EB003",
        price: 799,
        category: "audio",
        badge: "Premium",
        description: "High-quality Bluetooth 5.2 earbuds with active noise cancellation. 30-hour battery life with charging case. IPX7 waterproof rating and premium sound quality.",
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/60ac88f7-41c3-4555-9f75-df3b8693b5c2.__CR0,0,970,600_PT0_SX970_V1___.png" // Earbuds
    },
    {
        id: 4,
        name: "Ubon Neckband",
        code: "VMG-NB004",
        price: 999,
        category: "audio",
        badge: "Universal",
        description: "Experience the Ubon Neckband, a product of Vingajoy by UBON, featuring a dual battery for extended use and a 1-year warranty for peace of mind.",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/31efd2142379347.Y3JvcCw0MzE0LDMzNzUsODQzLDA.jpg" // Car mount
    },
    {
        id: 5,
        name: "Tempered Glass",
        code: "VMG-SP005",
        price: 150,
        category: "accessories",
        badge: "Crystal Clear",
        description: "Premium tempered glass screen protector with 9H hardness and oleophobic coating. Bubble-free installation kit included. Case-friendly design.",
        image: "https://cpimg.tistatic.com/07791366/b/5/Mobile-Tempered-Glass.jpg" // Screen protector
    },
    {
        id: 6,
        name: "Power Bank 20000mAh",
        code: "VMG-PB006",
        price: 2299,
        category: "chargers",
        badge: "High Capacity",
        description: "Ultra-high capacity power bank with 22.5W fast charging support. Multiple USB ports, LED display, and pass-through charging. Compatible with all devices.",
        image: "https://econaz.com.bd/wp-content/uploads/2023/01/c637ef1471a97a9bb09441975de92840.png" // Power bank
    },
    {
        id: 7,
        name: "Gaming Keyboard & Mouse Set",
        code: "VMG-GK007",
        price: 1499,
        category: "accessories",
        badge: "Gaming",
        description: "Frontech gaming keyboard and mouse set with colorful lighting. The mouse has changing lights.",
        image: "https://down-ph.img.susercontent.com/file/28e00b2f9d41318573b1c1daf4f334e1" // Gaming accessory
    },
    {
        id: 8,
        name: "Earphones",
        code: "VMG-EF008",
        price: 199,
        category: "audio",
        badge: "Earphones",
        description: "High-quality earphones with clear sound and comfortable fit. Perfect for everyday use.",
        image: "https://images-na.ssl-images-amazon.com/images/I/61ATwiAZpIL._SL1500_.jpg" // Waterproof case
    },
    {
        id: 9,
        name: "USB-C Fast Charging Cable",
        code: "VMG-CC009",
        price: 299,
        category: "chargers",
        badge: "Durable",
        description: "Premium braided USB-C cable with 60W fast charging support. Reinforced connectors and 10,000+ bend lifespan. Available in multiple lengths.",
        image: "https://www.ugreen.com/cdn/shop/files/ugreen-uno-usb-c-to-usb-c-fast-charging-cable-100w-with-led-display-760389.png?v=1725372763" // Charging cable
    },
    {
        id: 10,
        name: "Bluetooth Speaker Mini",
        code: "VMG-BS010",
        price: 1399,
        category: "audio",
        badge: "Portable",
        description: "Compact Bluetooth speaker with 360° surround sound and deep bass. 12-hour battery life, IPX6 water resistance, and hands-free calling support.",
        image: "https://m.media-amazon.com/images/I/71CZJlY5uQL._AC_.jpg" // Bluetooth speaker
    },
    {
        id: 11,
        name: "Watch Ultra (Smart Watch)",
        code: "VMG-SW011",
        price: 1499,
        category: "accessories",
        badge: "SmartWatch",
        description: "Advanced health tracking features, including ECG and blood oxygen monitoring. Always-On Retina display and swim-proof design.",
        image: "https://wallpaperaccess.com/full/2067364.jpg" // Phone ring
    },
    {
        id: 12,
        name: "Wireless Headphones",
        code: "VMG-WH012",
        price: 799,
        category: "audio",
        badge: "Comfort",
        description: "Over-ear wireless headphones with active noise cancellation and 40-hour battery life. Premium comfort padding and studio-quality sound.",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400" // Headphones
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupCustomCursor();
    setupNavigation();
    setupScrollAnimations();
    loadProducts();
    setupFormHandlers();
    setupCounterAnimations();
    setupMobileMenu();
    setupLogoAnimation();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('vmg-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    // Setup navbar scroll effect
    setupNavbarScroll();
}

// Custom Cursor System
function setupCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    function updateCursorOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.transform = `translate(${outlineX - 16}px, ${outlineY - 16}px)`;
        
        requestAnimationFrame(updateCursorOutline);
    }
    updateCursorOutline();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .nav-link, .cta-btn, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform += ' scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-primary)';
            cursorDot.style.background = 'var(--accent-primary)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
            cursorOutline.style.borderColor = 'var(--accent-primary)';
            cursorDot.style.background = 'var(--accent-primary)';
        });
    });
}

// Logo Animation
function setupLogoAnimation() {
    const logo = document.getElementById('animatedLogo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            this.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.8)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        // Click animation
        logo.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 100);
        });
    }
}

// Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .product-card, .process-step, .package-card, .feature-card, .stat-card, .contact-card');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Counter Animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Products Management
function loadProducts() {
    products = PRODUCTS_DATA;
    displayProducts(products);
    setupProductFilters();
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card animate-on-scroll" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 3rem; color: var(--text-muted);">
                    <i class="fas fa-image"></i>
                </div>
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-code">${product.code}</p>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        <span>Add to Cart</span>
                    </button>
                    <button class="btn btn-secondary" onclick="showProductDetails(${product.id})">
                        <i class="fas fa-info-circle"></i>
                        <span>Details</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-setup scroll animations for new products
    const newProducts = productsGrid.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    newProducts.forEach(product => observer.observe(product));
}

function setupProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                displayProducts(filteredProducts);
            }
        });
    });
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showToast('Product added to cart!', 'success');
    
    // Add animation to cart button
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        cartBtn.style.animation = '';
    }, 500);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
    showToast('Product removed from cart', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCart();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartSubtotal.textContent = totalPrice.toLocaleString();
    cartTotal.textContent = totalPrice.toLocaleString();
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <span>Add some products to get started</span>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--text-muted);">
                        <i class="fas fa-image"></i>
                    </div>
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-code">${item.code}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function saveCart() {
    localStorage.setItem('vmg-cart', JSON.stringify(cart));
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = "🛒 *VMG Order Request*\n\n";
    message += "Hi! I'd like to order the following items:\n\n";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Code: ${item.code}\n`;
        message += `   Qty: ${item.quantity} × ₹${item.price.toLocaleString()} = ₹${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    message += `💰 *Total Amount: ₹${totalPrice.toLocaleString()}*\n\n`;
    message += "Please confirm my order and let me know the delivery details. Thank you!";
    
    const whatsappUrl = `https://wa.me/918979220256?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 4rem; color: var(--text-muted);">
                    <i class="fas fa-image"></i>
                </div>
            </div>
            <div class="product-modal-details">
                <h3 class="product-modal-title">${product.name}</h3>
                <p class="product-modal-code">Product Code: ${product.code}</p>
                <div class="product-modal-price">₹${product.price.toLocaleString()}</div>
                <p class="product-modal-description">${product.description}</p>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal();">
                        <i class="fas fa-cart-plus"></i>
                        <span>Add to Cart</span>
                    </button>
                    <button class="btn btn-secondary" onclick="buyNow(${product.id})">
                        <i class="fas fa-bolt"></i>
                        <span>Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="query-form">
            <h4><i class="fas fa-question-circle"></i> Have Questions About This Product?</h4>
            <form id="productQueryForm" onsubmit="handleProductQuery(event, ${product.id})">
                <input type="hidden" name="access_key" value="d9c95c6e-6669-46c7-9553-811cca27bd94">
                <input type="hidden" name="subject" value="Product Query - ${product.name} (${product.code}) - VMG Website">
                <input type="hidden" name="product_name" value="${product.name}">
                <input type="hidden" name="product_code" value="${product.code}">

                <!-- 👇 Yeh add karo -->
                <input type="hidden" name="from_name" value="VMG Query">
                
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="name" required>
                        <label>Your Name</label>
                        <div class="form-line"></div>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" required>
                        <label>Email Address</label>
                        <div class="form-line"></div>
                    </div>
                </div>
                
                <div class="form-group">
                    <input type="tel" name="phone" required>
                    <label>Phone Number</label>
                    <div class="form-line"></div>
                </div>
                
                <div class="form-group">
                    <textarea name="query" rows="3" required></textarea>
                    <label>Your Question</label>
                    <div class="form-line"></div>
                </div>
                
                <button type="submit" class="submit-btn">
                    <i class="fas fa-paper-plane"></i>
                    <span>Send Query</span>
                    <div class="btn-glow"></div>
                </button>
            </form>
        </div>
    `;
    
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function buyNow(productId) {
    addToCart(productId);
    closeProductModal();
    toggleCart();
}

// PC Build Query Modal
function openBuildQuery(buildType) {
    document.getElementById('buildType').value = buildType;
    document.getElementById('buildQueryModal').classList.add('active');
}

function closeBuildQuery() {
    document.getElementById('buildQueryModal').classList.remove('active');
}

// Form Handlers
function setupFormHandlers() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // PC Build Query Form
    const buildQueryForm = document.getElementById('buildQueryForm');
    if (buildQueryForm) {
        buildQueryForm.addEventListener('submit', handleBuildQuery);
    }
}

async function handleContactForm(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const form = event.target;
    const formData = new FormData(form);
    
    showLoading();
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showThankYou('Thank you for contacting us! We\'ll get back to you within shortly.');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

async function handleBuildQuery(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const form = event.target;
    const formData = new FormData(form);
    
    showLoading();
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showThankYou('Thank you for your PC build inquiry! Our expert will contact you within shortly to discuss your requirements.');
            form.reset();
            closeBuildQuery();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Sorry, there was an error sending your inquiry. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

async function handleProductQuery(event, productId) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const form = event.target;
    const formData = new FormData(form);
    
    showLoading();
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showThankYou('Thank you for your query! Our team will respond with detailed information about this product shortly.');
            form.reset();
            closeProductModal();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Sorry, there was an error sending your query. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// UI Helpers
function showLoading() {
    isLoading = true;
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    isLoading = false;
    document.getElementById('loadingOverlay').classList.remove('active');
}

function showThankYou(message) {
    document.getElementById('thankYouMessage').textContent = message;
    document.getElementById('thankYouModal').classList.add('active');
}

function closeThankYou() {
    document.getElementById('thankYouModal').classList.remove('active');
}

function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            z-index: 10001;
            transform: translateX(400px);
            transition: all var(--transition-base);
            box-shadow: var(--shadow-lg);
            backdrop-filter: blur(10px);
            border: var(--border-secondary);
            max-width: 300px;
        `;
        document.body.appendChild(toast);
    }
    
    // Set toast style based on type
    const styles = {
        success: {
            background: 'rgba(0, 255, 136, 0.1)',
            color: 'var(--accent-success)',
            borderColor: 'var(--accent-success)'
        },
        error: {
            background: 'rgba(255, 71, 87, 0.1)',
            color: 'var(--accent-error)',
            borderColor: 'var(--accent-error)'
        },
        warning: {
            background: 'rgba(255, 170, 0, 0.1)',
            color: 'var(--accent-warning)',
            borderColor: 'var(--accent-warning)'
        },
        info: {
            background: 'rgba(0, 212, 255, 0.1)',
            color: 'var(--accent-primary)',
            borderColor: 'var(--accent-primary)'
        }
    };
    
    const style = styles[type] || styles.info;
    Object.assign(toast.style, style);
    
    toast.textContent = message;
    toast.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
    }, 4000);
}

// Close modals on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeProductModal();
        closeBuildQuery();
        closeThankYou();
    }
});

// Close modals on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
        closeBuildQuery();
        closeThankYou();
        if (document.querySelector('.cart-sidebar.active')) {
            toggleCart();
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add ripple effect to buttons
function addRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        animation: ripple 0.6s ease;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize ripple effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const buttons = document.querySelectorAll('.btn, .cta-btn, .submit-btn, .package-btn, .filter-btn');
        buttons.forEach(button => {
            button.addEventListener('click', addRippleEffect);
        });
    }, 1000);
});

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Smooth scroll for anchor links
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

// Add loading states to forms
function addLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    }
}

function removeLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
    }
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showToast('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}









const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.policy-container, footer').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'all 1s ease';
      observer.observe(el);
    });