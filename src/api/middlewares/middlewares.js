import cors from "cors";
import express from "express";

export default function middlewares(app) {
    app.use(cors());
    app.use(express.json()); //parsear json y poder recivir datos en formato json
    app.use(express.urlencoded({ extended: true })); //parsear formularios y poder recivir datos en formulario
    app.use('/uploads', express.static('./src/uploads')); //sirvo mis imagenes

}