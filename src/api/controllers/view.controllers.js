import productModel from "../models/product.models.js";

export const productsView = async (req, res) => {
    try {
        const [rows] = await productModel.selectAllProducts();

        res.render("index", {
            title: "Dashboard",
            about: "Panel de Administracion de Productos",
            productos: rows,
            user: req.session.user
        });

    } catch (error) {
        console.error(error)
    }
}