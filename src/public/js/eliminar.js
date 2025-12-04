const productList = document.getElementById("product-list");
const getProductForm = document.getElementById("getProduct-form");
const url = "http://localhost:3000";

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
        }
    } catch (error) {
        console.error("Error al consultar el producto:", error);
        displayError("Ocurrio un error al consultar el producto.");
    }
});

function displayFoundProduct(product) {
    const productHtml = `
        <div class="card-products" style="border-color: var(--danger);">
            <img class="producto-img" src="${url}/uploads/${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p><strong>ID:</strong> ${product.id}</p>
            <p class="product-price">$${product.precio}</p>
            <p><strong>Categoría:</strong> ${product.categoria || 'N/A'}</p>
            <p><strong>Activo:</strong> ${product.activo === 1 ? "Sí" : "No"}</p>
            <button id="btn-delete-product" class="btn" style="background-color: var(--danger);">
                Borrar permanentemente
            </button>
        </div>
    `;

    productList.innerHTML = productHtml;

    document.getElementById("btn-delete-product").addEventListener("click", () => {
        confirmDeletion(product.id);
    });
}

async function confirmDeletion(id) {
    if (!confirm("¿Estas seguro de que quieres eliminar este producto? Esta accion no se puede deshacer.")) {
        return;
    }

    try {
        const response = await fetch(`${url}/api/productos/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            productList.innerHTML = ""; // Limpiamos la pantalla
        } else {
            alert("Error: " + result.message);
        }

    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        displayError("Ocurrio un error al eliminar el producto.");
    }
}

function displayError(message) {
    productList.innerHTML = `
        <div class="message-error">
            <p><strong>Error:</strong> ${message}</p>
        </div>
    `;
}
;