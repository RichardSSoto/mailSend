//Requerimos el paquete nodemailer
var nodemailer = require('nodemailer');
//Requerimos el paquete jspdf
const { jsPDF } = require ("jspdf");
//Requerimos el paquete fs
const fs = require('fs');


// Crear pdf
const doc = new jsPDF();
doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");


//Enviar mail
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
          path: './a4.pdf'
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


//DELAY
console.log('Iniciando...');
setTimeout(function() {
  console.log('¡Han pasado 2 segundos!');
  // Eliminar el archivo PDF
    fs.unlink('./a4.pdf', function(error) {
        if (error) {
        console.log(error);
        } else {
        console.log('Archivo PDF eliminado.');
        }
    });
}, 2000);

 