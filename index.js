const sgMail = require('@sendgrid/mail')

//sgMail.setApiKey('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');
sgMail.setApiKey('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');
//console.log(sgMail.setApiKey(process.env.SENDGRID_API_KEY));
const msg = {
  to: 'rsantiagos@uni.pe', // Change to your recipient
  from: 'test@rapimoney.pe', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
