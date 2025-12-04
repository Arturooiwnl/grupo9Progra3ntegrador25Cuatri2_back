const productList = document.getElementById("product-list");
const getProductForm = document.getElementById("getProduct-form");
const updateFormContainer = document.getElementById("updateFormContainer");
const url = "http://localhost:3000";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCounter = document.getElementById("cart-counter-span");

getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const productId = data.idProd;

    try {
        const response = await fetch(`${url}/api/productos/${productId}`);
        const result = await response.json();

        if (response.ok) {
            const product = result.payload[0];
            displayFoundProduct(product);
        } else {
            displayError(result.message);
            updateFormContainer.innerHTML = ""; // limpio el contenedor
        }
    } catch (error) {
        console.error("Error al consultar el producto:", error);
        displayError("Ocurrió un error al consultar el producto.");
    }
});

function displayFoundProduct(product) {
    const productHtml = `
        <div class="card-products found-product">
            <img class="product-img" src="${url}/uploads/${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p><strong>ID:</strong> ${product.id}</p>
            <p class="product-price">$${product.precio}</p>
            <p><strong>Categoría:</strong> ${product.categoria || 'N/A'}</p>
            <p><strong>Activo:</strong> ${product.activo === 1 ? "Sí" : "No"}</p>
            <button id="btn-update-product" class="btn">Modificar este Producto</button>
        </div>
    `;

    productList.innerHTML = productHtml;

    // Scroll 
    productList.scrollIntoView({ behavior: 'smooth', block: 'center' });

    document.getElementById("btn-update-product").addEventListener("click", () => {
        createEditForm(product);
    });
}

function createEditForm(product) {
    const formHtml = `
        <div class="form-card">
            <h2 style="text-align: center; color: var(--primary); margin-bottom: 1.5rem;">Editar Producto</h2>
            <form id="updateProducts_form">
                <input type="hidden" name="id" value="${product.id}">
                <div class="radio-group">
                    <label class="radio-group-label">Estado:</label>
                    <div class="radio-options">
                        <label class="radio-option">
                            <input type="radio" name="activo" value="1" ${product.activo === 1 ? 'checked' : ''}>
                            <span>Activo</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="activo" value="0" ${product.activo === 0 ? 'checked' : ''}>
                            <span>Inactivo</span>
                        </label>
                    </div>
                </div>

                <label for="nameProd">Nombre del Producto</label>
                <input type="text" name="nombre" id="nameProd" value="${product.nombre}" required>

                <label for="imageProd">Nombre de la Imagen</label>
                <input type="text" name="imagen" id="imageProd" value="${product.imagen}" required>

                <label for="priceProd">Precio</label>
                <input type="number" name="precio" id="priceProd" value="${product.precio}" step="0.01" required>
                
                <label for="categoryProd">Categoría</label>
                <select name="categoria" id="categoryProd" required>
                <option value="PlayStation" ${product.categoria === 'PlayStation' ? 'selected' : ''}>PlayStation</option>
                <option value="Xbox" ${product.categoria === 'Xbox' ? 'selected' : ''}>Xbox</option>
                <option value="Nintendo" ${product.categoria === 'Nintendo' ? 'selected' : ''}>Nintendo</option>
                </select>

                <input type="submit" value="Guardar Cambios" class="btn-form">
            </form>
        </div>
    `;

    updateFormContainer.innerHTML = formHtml;
    
    // Scroll
    setTimeout(() => {
        updateFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    document.getElementById("updateProducts_form").addEventListener("submit", processUpdate);
}

async function processUpdate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${url}/api/productos`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Producto actualizado exitosamente");
            location.reload();
        } else {
            alert("Error: " + result.message);
        }

    } catch (error) {
        console.error("Error en PUT:", error);
        alert("Error al procesar la actualización");
    }
}

function displayError(message) {
    productList.innerHTML = `
        <div class="message-error">
            <p><strong>Error:</strong> ${message}</p>
        </div>
    `;
    
    productList.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateCartCounter() {
    if (cartCounter) {
        cartCounter.textContent = `${cart.length}`;
    }
}

updateCartCounter();