const dotenv = require('dotenv').config()
var nodemailer = require('nodemailer');
const pug = require('pug');
const compiledFunction = pug.compileFile('./templateEmail.pug');


var requireAuth = () => {
    return(process.env.SMTP_REQUIRE_AUTH ? 
        { host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
            user: process.env.SMTP_USER, // Your email id
            pass: process.env.SMTP_PASS // Your password
        }} 
        : 
        { host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE})
}

var transporter = nodemailer.createTransport( requireAuth());

var createBody = (name,email,message) => {
    return compiledFunction({
        name: name,
        email: email,
        message: message
    });
}

var mailOptionsAttached= (SMTP_USER,RECEPTOR_MAIL,subject,text,attachments) => {
    
    // Definimos el email
    return mailOptions = {
        from: SMTP_USER,
        to: RECEPTOR_MAIL,
        subject: subject,
        text: text,
        attachments: attachments
    };
}

exports.sendEmail = (name,email,subject,message) => {

// Definimos el email
    var mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.RECEPTOR_MAIL,
        subject: subject,
        html: createBody(name,email,message),
    };

// Enviamos el email
    return transporter.sendMail(mailOptions)
};

exports.sendEmailAttached = (subject,file) => {

    const attachments = [{
        "filename": file,
        "path": "./files/"+ file
    }]
    const mailOptions = mailOptionsAttached(process.env.SMTP_USER, process.env.RECEPTOR_MAIL, subject, 'Envio de CV.', attachments)
    const mailOptions2 = mailOptionsAttached(process.env.SMTP_USER, process.env.RECEPTOR_MAIL2, subject, 'Envio de CV.', attachments)
        
    // Enviamos el email
    transporter.sendMail(mailOptions)
    return transporter.sendMail(mailOptions2)
    };
