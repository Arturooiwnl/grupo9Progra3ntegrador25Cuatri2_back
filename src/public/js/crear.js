const url = "http://localhost:3000";
const createProductForm = document.getElementById("createProductForm");
const createUserForm = document.getElementById("createUserForm");

// users
createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log(event.target);
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    console.log(data);
    

    try {
        let response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            if(response.ok) {
                console.log(response);

                let result = await response.json();
                console.log(result.message);
                alert(result.message)
            }
        

    } catch(error) {
        console.error("Error al crear el usuario:", error);
        displayError("Ocurrio un error al crear el usuario.");
    }
})
// productos
createProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log(event.target);
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    try {
        let response = await fetch(`${url}/api/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            if(response.ok) {
                console.log(response);

                let result = await response.json();
                console.log(result.message);
                alert(result.message)
            }
        

    } catch(error) {
        console.error("Error al crear el producto:", error);
        displayError("Ocurrio un error al crear el producto.");
    }
})