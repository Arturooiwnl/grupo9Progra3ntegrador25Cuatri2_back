import express from "express"; //importamos el framework express
const app = express();
import environments from "./src/api/config/environments.js"; // importamos las variables de entonro
import connection from "./src/api/database/db.js";//importamos la conexion a la base de datos
import middlewares from "./src/api/middlewares/middlewares.js";

const PORT = environments.port;

//Middlewares//

middlewares(app);

//ENDPOINT//

app.get("/productos", async (req, res) => {
    try {
        const sql = `SELECT * FROM productos`;
        /*
        const resultado = await connection.query(sql);
        console.log(resultado)
        */

        const [rows] = await connection.query(sql);
        console.log(rows);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0? "no se encontraron productos" : "productos encontrados"
        })

    } catch(error) {
        console.error(error);

        res.status(500).json({
            message:"Error interno al obtener productos"
        })
    }
});


app.get("/productos/:id", async (req, res) => {
    try {
        let {id} = req.params; // esto me permite obtener el valor numerico despues de productos/productos/2

        let sql = `SELECT * FROM productos where id = ?`;
        const [rows] = await connection.query(sql, [id]); // el id reemplaza el ?

        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.error("Error obteniendo producto ID". error, message);

        res.status(500).json({
            message:"Error"
        })
    }
})


app.post("/productos", async (req, res) => {
    try {
        const { nombre, imagen, categoria, precio} = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body);

        // Los placeholders ?, evitan inyecciones SQL para evitar ataques de este tipo
        let sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?,?,?,?)";

        //le envio estos valores a la DB
        let [rows] = await connection.query(sql, [nombre, imagen, categoria, precio]);

        //devuelvo una respuesta 201 "created"
        res.status(201).json({
            message: "producto encontrado con exito"
        });

    } catch(error) {
        console.error("error interno del servidor",error);

        res.status(500).json({
            message:"error interno del servidor",
            error: error.message
        })
    }
});


app.put("/productos", async (req, res) => {
    try {
        let {id, nombre, categoria, precio, imagen} = req.body;
        
        let sql = `
        UPDATE productos
        set nombre = ?, categoria = ?, precio = ?, imagen = ?
        WHERE id = ?
        `;
        
        let [result] = await connection.query(sql, [nombre, categoria, precio, imagen]);
        console.log(result);

        res.status(200).json({
            message: "Producto actualizo correctamente"
        });

    } catch (error) {
        console.error("error al actualizar el producto", error);

        res.status(500).json({
            message: "error al actualizar el producto",
            error: error.message
        })
    }
})


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})
