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





app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})
