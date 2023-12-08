// Declarar datos globalmente
let data;

// Definir la variable de carrito globalmente
let cart = [];

// Cargar datos del carrito desde el localStorage
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

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

    // Iterar a través de las categorías
    data.forEach(category => {
        // Agregar el título de la categoría
        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('border-bottom', 'border-2', 'pb-1');
        categoryTitle.innerText = category.category;
        productContainer.appendChild(categoryTitle);

        // Crear una fila para los productos en la categoría
        const productRow = document.createElement('div');
        productRow.classList.add('row', 'm-3');
        productContainer.appendChild(productRow);

        // Iterar a través de los productos en la categoría
        category.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-xl-3', 'col-md-6', 'product-card', 'p-0');

            productCard.innerHTML = `
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-details">
                    <h5 class="card-title pt-3">${product.name}</h5>
                    <p>${product.description}</p>
                    <button class="btn btn-primary mb-2 p-3" onclick="showProductInfo(${product.id})">Info</button>
                    <button class="btn btn-success mb-2 " onclick="addToCart(${product.id})">Agregar<br>al Carrito</button>
                </div>
            `;

            // Adjuntar la tarjeta del producto a la fila
            productRow.appendChild(productCard);
        });
    });
}

// Función para mostrar información detallada del producto
function showProductInfo(productId) {
    const product = getProductById(productId);
    if (product) {
        // Implementar el código para mostrar la información detallada del producto (por ejemplo, en un modal)
        alert(`Información:\n${product.name}\n${product.description}`);
    }
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = getProductById(productId);

    if (product) {
        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // Incrementar la cantidad si el producto ya está en el carrito
            existingProduct.quantity++;
        } else {
            // Agregar el producto al carrito con una cantidad de 1
            cart.push({ ...product, quantity: 1 });
        }

        // Llamar a una función para actualizar la visualización del carrito
        updateCartDisplay();
        // Guardar los datos actualizados del carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    // Encontrar el índice del producto en el carrito
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        // Eliminar el producto del carrito
        const product = cart[index];
        if (product.quantity > 1) {
            // Si hay más de una cantidad, decrementar la cantidad
            product.quantity--;
        } else {
            // Si hay solo una cantidad, eliminar todo el producto del carrito
            cart.splice(index, 1);
        }

        // Llamar a una función para actualizar la visualización del carrito
        updateCartDisplay();
        // Guardar los datos actualizados del carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Función para limpiar todo el carrito
function clearCart() {
    cart = [];
    updateCartDisplay();
    // Guardar los datos actualizados del carrito en el localStorage
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
    const clearCartButton = document.getElementById('clear-cart');

    // Limpiar el contenido existente
    cartContent.innerHTML = '';

    // Mostrar cada producto en el carrito
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${product.name}: ${product.quantity}</p>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Eliminar</button>
        `;
        cartContent.appendChild(cartItem);
    });

    // Mostrar el botón para limpiar el carrito
    clearCartButton.style.display = cart.length > 0 ? 'block' : 'none';
}

// Alternar la visibilidad del carrito de compras
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}
















