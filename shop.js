// Shop page functionality
let currentDepartment = 'All';
let currentCategory = 'All';
let currentSearch = '';

function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image-container';

    const image = document.createElement('img');
    const images = product.images?.length ? product.images : [{ src: product.image, alt: product.name }];
    let activeImageIndex = 0;
    image.src = images[activeImageIndex].src;
    image.alt = `${product.brand || 'LEEWEAR'} ${images[activeImageIndex].alt}`;
    image.className = 'product-image';
    image.loading = 'lazy';
    image.decoding = 'async';
    imageContainer.appendChild(image);

    if (images.length > 1) {
        const controls = document.createElement('div');
        controls.className = 'gallery-controls';

        const counter = document.createElement('span');
        counter.className = 'gallery-counter';
        counter.setAttribute('aria-live', 'polite');
        counter.textContent = `1 / ${images.length}`;

        const showImage = index => {
            activeImageIndex = (index + images.length) % images.length;
            image.src = images[activeImageIndex].src;
            image.alt = `${product.brand || 'LEEWEAR'} ${images[activeImageIndex].alt}`;
            counter.textContent = `${activeImageIndex + 1} / ${images.length}`;
        };

        const previousButton = document.createElement('button');
        previousButton.type = 'button';
        previousButton.className = 'gallery-control';
        previousButton.setAttribute('aria-label', `Previous image of ${product.name}`);
        previousButton.textContent = '‹';
        previousButton.addEventListener('click', () => showImage(activeImageIndex - 1));

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'gallery-control';
        nextButton.setAttribute('aria-label', `Next image of ${product.name}`);
        nextButton.textContent = '›';
        nextButton.addEventListener('click', () => showImage(activeImageIndex + 1));

        controls.append(previousButton, counter, nextButton);
        imageContainer.appendChild(controls);
    }

    const info = document.createElement('div');
    info.className = 'product-info';

    const brand = document.createElement('span');
    brand.className = 'product-brand';
    brand.textContent = product.brand || 'LEEWEAR';

    const name = document.createElement('h2');
    name.className = 'product-name';
    name.textContent = product.name;

    const price = document.createElement('div');
    price.className = 'product-price';

    const originalPrice = document.createElement('span');
    originalPrice.className = 'price-original';
    originalPrice.textContent = `KSH ${product.price.toLocaleString()}`;

    const currentPrice = document.createElement('span');
    currentPrice.className = 'price-current';
    currentPrice.textContent = `KSH ${getDiscountedPrice(product.price).toLocaleString()}`;

    const saving = document.createElement('span');
    saving.className = 'price-saving';
    saving.textContent = `${getDiscountPercent()}% OFF`;

    price.append(originalPrice, currentPrice, saving);
    info.append(brand, name, price);
    imageContainer.appendChild(info);

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'add-to-cart-btn';
    addButton.textContent = 'Add to Cart';
    addButton.setAttribute('aria-label', `Add ${product.name} to cart`);
    addButton.addEventListener('click', () => addToCart(product));

    card.append(imageContainer, addButton);
    return card;
}

function renderDepartmentFilters() {
    const departmentFilters = document.getElementById('department-filter');
    departmentFilters.replaceChildren();

    ['All', 'Men', 'Women', 'Accessories'].forEach(department => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `filter-btn${currentDepartment === department ? ' active' : ''}`;
        button.dataset.department = department;
        const departmentCount = department === 'All'
            ? products.length
            : products.filter(product => product.department === department).length;
        button.textContent = `${department === 'All' ? 'All Departments' : department} (${departmentCount})`;
        button.setAttribute('aria-pressed', String(currentDepartment === department));
        button.addEventListener('click', () => {
            currentDepartment = department;
            currentCategory = 'All';
            currentSearch = '';
            const searchInput = document.getElementById('product-search');
            if (searchInput) searchInput.value = '';
            updateDepartmentInUrl(department);
            renderProducts();
        });
        departmentFilters.appendChild(button);
    });
}

function updateDepartmentInUrl(department) {
    const url = new URL(window.location.href);
    if (department === 'All') {
        url.searchParams.delete('department');
    } else {
        url.searchParams.set('department', department);
    }
    url.searchParams.delete('category');
    window.history.replaceState({}, '', url);
}

function renderCategoryFilters(filteredProducts) {
    const categoryFilters = document.getElementById('category-filter');
    const categories = [...new Set(filteredProducts.map(product => product.category))].sort();
    categoryFilters.replaceChildren();

    ['All', ...categories].forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `filter-btn${currentCategory === category ? ' active' : ''}`;
        button.dataset.category = category;
        button.textContent = category === 'All' ? 'All Styles' : category;
        button.setAttribute('aria-pressed', String(currentCategory === category));
        button.addEventListener('click', () => {
            currentSearch = '';
            const searchInput = document.getElementById('product-search');
            if (searchInput) searchInput.value = '';
            filterProducts(category);
        });
        categoryFilters.appendChild(button);
    });
}

function renderProducts(category = currentCategory) {
    currentCategory = category;
    const productsGrid = document.getElementById('products-grid');
    const departmentProducts = currentDepartment === 'All'
        ? products
        : products.filter(product => product.department === currentDepartment);
    const matchingProducts = departmentProducts.filter(product => {
        const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
        const searchableText = `${product.name} ${product.category} ${product.department} ${product.brand || ''} ${(product.searchTerms || []).join(' ')}`.toLowerCase();
        return matchesCategory && searchableText.includes(currentSearch);
    });

    renderDepartmentFilters();
    renderCategoryFilters(departmentProducts);
    productsGrid.replaceChildren();

    if (matchingProducts.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'no-products';
        emptyState.textContent = 'No matching styles found. Try another search or department.';
        productsGrid.appendChild(emptyState);
        return;
    }

    const fragment = document.createDocumentFragment();
    matchingProducts.forEach(product => fragment.appendChild(createProductCard(product)));
    productsGrid.appendChild(fragment);
}

function filterProducts(category) {
    currentCategory = category;
    renderProducts(category);
}

window.addEventListener('leewear:promo-updated', () => renderProducts());

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const departmentParam = urlParams.get('department');
    const categoryParam = urlParams.get('category');
    const selectedDepartment = products.find(product =>
        product.department.toLowerCase() === (departmentParam || '').toLowerCase()
    )?.department;

    if (selectedDepartment) {
        currentDepartment = selectedDepartment;
    }
    const selectedCategory = products.find(product =>
        product.category.toLowerCase() === (categoryParam || '').toLowerCase()
    )?.category;
    if (selectedCategory) {
        currentCategory = selectedCategory;
    }

    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.trim().toLowerCase();
        if (currentSearch) currentCategory = 'All';
        renderProducts();
    });

    renderProducts();
});
