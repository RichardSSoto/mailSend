//Requerimos el paquete nodemailer
var nodemailer = require('nodemailer');
//Requerimos el paquete jspdf
const { jsPDF } = require ("jspdf");
//Requerimos el paquete fs
const fs = require('fs');
//import 'jspdf-autotable';
require("jspdf-autotable");

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
      console.log("dato: "+ this.data);

      // //Generar PED
      const doc = new jsPDF();
  
      doc.autoTable({
        styles: {
          // fillColor: [255, 0, 0]
          halign: 'center',
          valign: 'middle',
          lineWidth: 0.25,
        },
        // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } },
        // margin: { top: 10 },
        // columnStyles: {
        //   europe: { halign: 'center' }
        // },
        bodyStyles: {
          minCellHeight: 21
        },
        columns: [
          //{ header: 'N°', dataKey: 'index' },
          { header: 'Nombre', dataKey: 'nombre' },
          { header: 'Ocupación', dataKey: 'cargo' },
          { header: 'Área', dataKey: 'area' },
          { header: 'Nota Competencia', dataKey: 'nota_competencia' },
          { header: 'Nota Objetivo', dataKey: 'nota_objetivo' },
          { header: 'Nivel Alcanzado', dataKey: 'nivel_alcanzado' },
          { header: 'Razón Social', dataKey: 'razon_social' }
        ],
        body: [[dato.nombre, dato.cargo,dato.area,dato.nota_competencia,dato.nota_objetivo,dato.nivel_alcanzado,dato.razon_social]] //this.dato
            })
        doc.save("test.pdf");
        //FIN Generar PDF
        
        //Enviar PDF
        //Requerimos el paquete

        var nodemailer = require('nodemailer');

        //Creamos el objeto de transporte
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'richard.conectsen@gmail.com',
            pass: 'stauycidhzuqaabs'
        }
        });

        var mensaje = "Hola desde nodejs...";

        var mailOptions = {
        from: 'richard.conectsen@gmail.com',
        to: 'rsantiagos@uni.pe',
        subject: 'Asunto Del Correo',
        text: mensaje,
        attachments: [
            {
                path: './test.pdf'
            }
        ]
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
        });
        //FIn enviar correo

        //DELAY
        console.log('Iniciando...');
        setTimeout(function() {
        console.log('¡Han pasado 2 segundos!');
        // Eliminar el archivo PDF
            fs.unlink('./test.pdf', function(error) {
                if (error) {
                console.log(error);
                } else {
                console.log('Archivo PDF eliminado.');
                }
            });
        }, 5000);

        
    }

    console.log(data.length);

   

  });

  



