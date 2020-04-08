
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express()
var ctrlMail = require('./ctrlMail');
const port = process.env.PORT || 3000

const corsMiddleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}

app.use(corsMiddleware)
app.use(fileUpload())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/formsubmit', function (req,res) {
    console.log('req.body form');
    console.log(req.body);
    var name = req.body.name;
    var email= req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    ctrlMail.sendEmail(name,email,subject,message).then(response => {
        console.log(response)
        return res.status(200).send({status: true})
    }).catch(error => {
        console.log(error)
        return res.status(400).send({status:false})
    });
});

app.post('/api/cv', function (req,res) {
    let subject = 'Envio de CV';
    EDFile = req.files.file;
    console.log('req.files cv');
    console.log(req.files);
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ EDFile : err })
        ctrlMail.sendEmailAttached(subject,EDFile.name).then(response => {
            console.log(response)
            return res.status(200).send({status: true});
        }).catch(error => {
            console.log(error)
            return res.status(401).send({status: false});
        });
    })
    
});

app.get('/api/formsubmit/:name/:email/:subject/:message', function (req,res) {
    let name = req.params.name
    let email = req.params.email
    let subject = req.params.subject
    let message = req.params.message
    ctrlMail.sendEmail(name,email,subject,message).then(response => {
        res.send({status: true})
    }).catch(error => {
        res.send({status:false})
    });
});

/*app.post('/api/formsubmit', [
        check('name').isLength({min: 3}),
        check('email').isEmail(),
        check('subject').isLength({min:3}),
        check('message').isLength({min:3}),
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    //aca debe mandarse el email
    res.status(200).send('Su email se ha enviado correctamente')

})*/

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port));
