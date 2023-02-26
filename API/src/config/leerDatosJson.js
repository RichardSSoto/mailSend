const fs = require('fs');
/*
fs.readFile('./src/DatosMP/datos_asistentes.json', 'utf8', (err, data) => {
  if (err) throw err;
  const jsonData = JSON.parse(data);
  console.log(jsonData);
});
*/
// Lee el archivo JSON

fs.readFile('./src/DatosMP/datos_asistentes.json', 'utf8', (error, data) => {
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




