
const productList = document.getElementById("product-list");
const getProductForm = document.getElementById("getProduct-form");
const url = "http://localhost:3000";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCounter = document.getElementById("cart-counter-span");

getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const productId = data.idProd;

    console.log(`product ID: ${productId}`);

    try {
        const response = await fetch(`${url}/api/productos/${productId}`);
        const result = await response.json();

        if (response.ok) {
            const product = result.payload[0];
            displayProduct(product);
        } else {
            displayError(result.message);
        }
    } catch (error) {
        console.error("Error al consultar el producto:", error);
        displayError("Ocurrio un error al consultar el producto.");
    }
});

function displayProduct(product) {
    productList.innerHTML = "";
    
    const productHtml = `
        <div class="card-products found-product">
            <img class="product-img" src="${url}/uploads/${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p><strong>ID:</strong> ${product.id}</p>
            <p class="product-price">$${product.precio}</p>
            <p><strong>Categoría:</strong> ${product.categoria || 'N/A'}</p>
            <p><strong>Activo:</strong> ${product.activo === 1 ? "Sí" : "No"}</p>
        </div>
    `;

    productList.innerHTML = productHtml;
}

function displayError(message) {
    productList.innerHTML = `
        <div class="message-error">
            <p><strong>Error:</strong> ${message}</p>
        </div>
    `;
}

function updateCartCounter() {
    if (cartCounter) {
        cartCounter.textContent = `${cart.length}`;
    }
}

updateCartCounter();

