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
        path: './API/src/files/gas.pdf'
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


 // create reusable transporter object using the default SMTP transport
 /*
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'richard.conectsen@gmail.com', // generated ethereal user
      pass: 'stauycidhzuqaabs', // generated ethereal password
    },
  });
*/


