import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();

router.get("/", requireLogin, productsView);

router.get("/consultar", requireLogin, (req, res) => {
    res.render("consultar", {
        title: "Consultar producto",
        about: "Consultar un producto por ID"
    });
})

router.get("/crear", requireLogin, (req,res) => {
    res.render("crear", {
        title: "Crear productos y Usuarios",
        about: "Crear un nuevo producto o usuario"
    })
})

router.get("/eliminar", requireLogin, (req,res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        about: "Eliminar un producto por ID"
    })
})

router.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar producto",
        about: "Modificar un producto por ID"
    })
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

export default router;