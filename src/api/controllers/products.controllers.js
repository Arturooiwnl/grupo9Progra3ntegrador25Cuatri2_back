import productModel from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await productModel.selectAllProducts();

        console.log(rows)

        res.status(200).json({
            payload: rows,
            message: rows.length === 0? "no se encontraron productos" : "productos encontrados"
        });

    } catch(error) {
        console.error("Error al obtener productos", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        let { id } = req.params; 

        const [rows] = await productModel.selectProductFromId(id);

        if(rows.length ===0) {
            console.log("error, no existe producto con ese id");

            return res.status(404).json({
                message:`no se encontro producto con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.error("Error obteniendo producto ID". error, message);

        res.status(500).json({
            message:"Error interno al obtener producto por ID"
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { nombre, imagen, categoria, precio} = req.body;

        if(!nombre || !imagen || !categoria || !precio) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }
        
        const [result] = await productModel.insertProduct(nombre, imagen, categoria, precio);

        res.status(201).json({
            message: "producto creado con exito",
            id: result.insertId
        });

    } catch(error) {
        console.error("error interno del servidor",error);

        res.status(500).json({
            message:"error interno del servidor",
            error: error.message
        })
    }
}

export const modifyProduct = async (req, res) => {
    try {
        let {id, nombre, categoria, precio, imagen, activo} = req.body;

        if(!id || !nombre || !categoria || !precio || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }
        
        let [result] = await productModel.updateProduct(nombre, categoria, precio, imagen, activo, id);
        console.log(result);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("error al actualizar el producto", error);

        res.status(500).json({
            message: "error al actualizar el producto",
            error: error.message
        })
    }
}


export const removeProduct = async (req,res) => {
    try {
        let { id } = req.params;

        let [result] = await productModel.deleteProduct(id);;
        console.log(result);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch(error){
        console.log(`Error al eliminar producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
}