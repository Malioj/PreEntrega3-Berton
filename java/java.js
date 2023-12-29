// Declarar datos globalmente
let data;

// Definir la variable de carrito globalmente
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Obtener datos mediante una solicitud fetch
fetch('data/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        generateProductHTML(data);
        updateCartDisplay(); // Actualizar la visualización del carrito inicialmente
    })
    .catch(error => console.error('Error al obtener datos:', error));

// Función para generar el HTML de los productos
function generateProductHTML(data) {
    const productContainer = document.getElementById('product-container');
    data.forEach(category => {
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('text-white', 'text-center', 'mt-3');
        categoryTitle.innerText = category.category;
        productContainer.appendChild(categoryTitle);

        const productRow = document.createElement('div');
        productRow.classList.add('row', 'gx-4', 'gy-4');
        productContainer.appendChild(productRow);

        category.products.forEach(product => {
            const productCol = document.createElement('div');
            productCol.classList.add('col-xl-3', 'col-md-6');
            productRow.appendChild(productCol);

            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'text-center', 'p-3', 'bg-light', 'text-dark');
            productCard.innerHTML = `
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <h5 class="pt-3">${product.name}</h5>
                <p>${product.description}</p>
                <button class="btn btn-primary mb-2" onclick="showProductInfo(${product.id})">Info</button>
                <button class="btn btn-success" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productCol.appendChild(productCard);
        });
    });
}

// Función para mostrar información del producto
function showProductInfo(productId) {
    const product = getProductById(productId);
    if (product) {
        document.getElementById('productModalLabel').innerText = product.name;
        const modalBody = document.querySelector('#productModal .modal-body');
        modalBody.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="img-fluid">
            <p>${product.description}</p>
        `;
        new bootstrap.Modal(document.getElementById('productModal')).show();
    }
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = getProductById(productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const product = cart[index];
        if (product.quantity > 1) {
            product.quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Función para limpiar todo el carrito
function clearCart() {
    cart = [];
    updateCartDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para obtener un producto por su ID de los datos globales
function getProductById(productId) {
    for (const category of data) {
        const product = category.products.find(item => item.id === productId);
        if (product) {
            return product;
        }
    }
    return null;
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2');
        cartItem.innerHTML = `
            <span>${product.name}: ${product.quantity}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Eliminar</button>
        `;
        cartContent.appendChild(cartItem);
    });
    document.getElementById('clear-cart').style.display = cart.length > 0 ? 'block' : 'none';
}

// Alternar la visibilidad del carrito de compras
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}

















