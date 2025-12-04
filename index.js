import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/api/config/environments.js"; 

import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 
import { productRoutes, viewRoutes, userRoutes } from "./src/api/routes/index.js";
import {__dirname, join} from "./src/api/utils/index.js";

const app = express();

const PORT = environments.port;
const session_key = environments.session_key;

//Middlewares//
app.use(cors());
app.use(express.json()); 
app.use(loggerUrl);
app.use(express.urlencoded({ extended: true })); //parsear formularios y poder recivir datos en formulario
app.use(express.static(join(__dirname, "src/public")));

//middleware de sesion
app.use(session({
    secret: session_key, //aca firmo las cookies para evitar manipulacion
    resave: false, //aca evito guardar la session si no hubo cambios
    saveUninitialized: true // no guarde sesiones vacias
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

//Configs//
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

//Rutas//
app.use("/api/productos", productRoutes )
app.use("/api/users", userRoutes);
app.use("/", viewRoutes);


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})