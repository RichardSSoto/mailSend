const fs = require('fs');
const path = require('path');

const directorio = './src/DatosMP/';

fs.readdir(directorio, (err, archivos) => {
  if (err) {
    console.error(err);
    return;
  }

  const paths = archivos.map((archivo) => {
    return path.join(directorio, archivo);
  });

  console.log(paths);
  console.log(paths.length);
  var cont = paths.length;

  for(var i = 0; i<cont; i++){
    console.log(paths[i]);

    // Lee el archivo JSON
    fs.readFile(paths[i], 'utf8', (error, data) => {
        if (error) {
        console.error(error);
        return;
        }
    
        // Convierte el contenido del archivo a un objeto JavaScript
        const datos = JSON.parse(data);
    
        // Itera sobre los datos y asigna sus campos a variables
        for (const dato of datos) {
        const fecha_resolucion = dato.fecha_resolucion;
        const nombre = dato.nombre;
        const correo = dato.correo;
    
        // Haz algo con las variables, como imprimir sus valores
        console.log(`Fecha Resolucion: ${fecha_resolucion}, Nombre: ${nombre}, Correo: ${correo}`);
        }

        console.log(data.length);
    });

  }
});

