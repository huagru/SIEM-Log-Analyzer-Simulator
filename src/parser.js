// importa el modulo fs de node, para trabajar con archivos.
const fs = require("fs");

// Importa el modulo path de node, para trabajar con rutas de archivos.
const path = require("path");



// Define la ruta del archivo de log utilizando el módulo 'path'.
const ruta = path.join(__dirname, "..", "logs", "log.txt");




function parsearApache(ruta) {
    // Lee el texto del archivo y lo almacena como un string único en 'contenido'.
    const contenido = fs.readFileSync(ruta, "utf-8");

    // Divide el contenido del archivo en líneas ("\n"). Cada línea es un elemento de registros. 
    const registros = contenido.split("\n");


    
    console.log(registros);

    


}


parsearApache(ruta);

