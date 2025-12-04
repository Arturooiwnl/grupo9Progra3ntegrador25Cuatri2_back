import {fileURLToPath} from "url"; 
import {dirname, join} from "path";

// obtnere el nombre de archivo actual
const __filename = fileURLToPath(import.meta.url); //ej: file://ruta/al/archivo.js

//obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../") 

export{
    __dirname,
    join
}
