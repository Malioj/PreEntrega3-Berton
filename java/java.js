// Obtener los datos JSON
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        // Procesar y generar HTML basado en los datos
        generateProductHTML(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Función para generar HTML para productos
function generateProductHTML(data) {
    const productContainer = document.getElementById('product-container');

    // Iterar a través de categorías
    data.forEach(category => {
        // Agregar título de categoría
        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('border-bottom', 'border-2', 'pb-1');
        categoryTitle.innerText = category.category;
        productContainer.appendChild(categoryTitle);

        // Crea una fila para los productos de la categoría.
        const productRow = document.createElement('div');
        productRow.classList.add('row', 'mt-4');
        productContainer.appendChild(productRow);

        // Iterar a través de productos en la categoría
        category.products.forEach(product => {
            // Crea un envoltorio para la ficha de producto con margen
            const productCardWrapper = document.createElement('div');
            productCardWrapper.classList.add('col-xl-3', 'col-md-6');

            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-details">
                    <h5 class="card-title">${product.name}</h5>
                    <p>${product.description}</p>
                    <a href="#" class="btn btn-primary">INFO</a>
                </div>
            `;

            // Agrega la tarjeta del producto al envoltorio
            productCardWrapper.appendChild(productCard);

            // Agrega el contenedor a la fila
            productRow.appendChild(productCardWrapper);
        });
    });
}









