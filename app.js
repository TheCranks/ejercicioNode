var express = require('express');
var protocols = require('./protocolos/index');
var app = express();

app.use(express.json());


let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/radar', function(req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Para obtener los valores, debe hacer peticion por post'
    };

});

app.post('/radar', function(req, res) {
    respuesta = {
        "x":0,"y":0
    };
    var datos = {
        "protocols": req.body.protocols,
        "scan":req.body.scan
    };
respuesta = protocols.getValidationProtocol(datos.protocols,datos.scan);
   res.send(respuesta);
});



app.listen(8888, () => {
    console.log("El servidor está inicializado en el puerto 8888");
});