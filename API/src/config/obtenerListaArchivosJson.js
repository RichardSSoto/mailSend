const fs = require('fs');
const path = require('path');

const dataDir = './src';

// Leer el contenido del directorio
fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  
  // Filtrar los nombres de las carpetas que empiezan con "Datos"
  const dataDirs = files.filter(file => {
    const filePath = path.join(dataDir, file);
    return fs.statSync(filePath).isDirectory() && file.startsWith('Datos');
  });

  // Recorrer cada carpeta y hacer una lista con los nombres de los archivos
  const dataFiles = dataDirs.reduce((result, dir) => {
    const dirPath = path.join(dataDir, dir);
    const files = fs.readdirSync(dirPath);
    result[dir] = files;
    return result;
  }, {});

  console.log(dataFiles);
});


//
/*
const fs = require('fs');
const path = require('path');

// Directorio que contiene los archivos a leer
const dirPath = './carpeta_con_archivos';

// Obtener la lista de archivos de la carpeta
const files = fs.readdirSync(dirPath);

// Iterar sobre cada archivo
files.forEach(file => {
  // Obtener la ruta completa del archivo
  const filePath = path.join(dirPath, file);
  
  // Leer el archivo
  const data = fs.readFileSync(filePath, 'utf8');
  
  // Hacer algo con los datos del archivo
  console.log(`Datos del archivo ${file}:`);
  console.log(data);
});
*/
