// Cart management
let cart = JSON.parse(localStorage.getItem('leewear-cart') || '[]');
const PROMO_CODE = 'SHOPLEEWEAR80';
const PROMO_STORAGE_KEY = 'leewear-promo-code';

function getCurrentPromoCode() {
    return localStorage.getItem(PROMO_STORAGE_KEY) || '';
}

function getDiscountPercent() {
    return getCurrentPromoCode().toUpperCase() === PROMO_CODE ? 80 : 50;
}

function getDiscountedPrice(price) {
    return Math.round(price * (1 - getDiscountPercent() / 100));
}

function applyPromoCode(value) {
    const code = value.trim().toUpperCase();
    const statuses = document.querySelectorAll('[data-promo-status]');

    if (code !== PROMO_CODE) {
        statuses.forEach(status => {
            status.textContent = `That code isn't valid. Try ${PROMO_CODE}.`;
        });
        return false;
    }

    localStorage.setItem(PROMO_STORAGE_KEY, PROMO_CODE);
    document.querySelectorAll('.promo-code-input').forEach(input => {
        input.value = PROMO_CODE;
    });
    statuses.forEach(status => {
        status.textContent = '80% off applied to your order. It replaces the seasonal offer.';
    });
    updateCartUI();
    window.dispatchEvent(new CustomEvent('leewear:promo-updated'));
    return true;
}

function saveCart() {
    localStorage.setItem('leewear-cart', JSON.stringify(cart));
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    updateCartCount();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCartUI();
        updateCartCount();
    }
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + (getDiscountedPrice(item.price) * item.quantity), 0);
}

function getOriginalTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = getTotalItems();
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.add('active');
    } else {
        cartCount.classList.remove('active');
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const totalPrice = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">
                        <span class="price-original">KSH ${item.price.toLocaleString()}</span>
                        KSH ${getDiscountedPrice(item.price).toLocaleString()}
                        <span class="price-saving">${getDiscountPercent()}% seasonal saving</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        totalPrice.textContent = `KSH ${getTotalPrice().toLocaleString()}`;
        const cartSavings = document.getElementById('cart-savings');
        if (cartSavings) {
            cartSavings.textContent = `You save KSH ${(getOriginalTotalPrice() - getTotalPrice()).toLocaleString()} (${getDiscountPercent()}% off)`;
        }
        cartFooter.style.display = 'block';
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return;
    
    const orderDetails = cart.map(item => 
        `${item.name} (x${item.quantity}) - KSH ${(getDiscountedPrice(item.price) * item.quantity).toLocaleString()} (${getDiscountPercent()}% off; original KSH ${(item.price * item.quantity).toLocaleString()})`
    ).join('\n');
    
    const subject = 'LEEWEAR Order Request';
    const promoLine = getCurrentPromoCode().toUpperCase() === PROMO_CODE
        ? `Promo code: ${PROMO_CODE} (80% off)\n`
        : 'Seasonal discount: 50% off\n';
    const body = `Hello,\n\nI would like to place an order for the following items:\n\n${orderDetails}\n\n${promoLine}Original total: KSH ${getOriginalTotalPrice().toLocaleString()}\nYou save: KSH ${(getOriginalTotalPrice() - getTotalPrice()).toLocaleString()}\nTotal: KSH ${getTotalPrice().toLocaleString()}\n\nThank you!`;
    
    window.location.href = `mailto:leemessi63@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartUI();
    updateCartCount();
    toggleCart();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-promo-form]').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const input = form.querySelector('.promo-code-input');
            applyPromoCode(input.value);
        });
    });

    const currentPromoCode = getCurrentPromoCode();
    document.querySelectorAll('.promo-code-input').forEach(input => {
        if (currentPromoCode) input.value = currentPromoCode;
    });
    if (currentPromoCode.toUpperCase() === PROMO_CODE) {
        document.querySelectorAll('[data-promo-status]').forEach(status => {
            status.textContent = '80% off applied to your order. It replaces the seasonal offer.';
        });
    }

    updateCartCount();
    updateCartUI();
});
