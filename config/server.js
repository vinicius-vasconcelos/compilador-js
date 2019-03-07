//Pacotes utilizados
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

//pacote extra para dev
const  morgan = require('morgan');

//inciando express na variável APP
let app = express();

//configurando ejs como view engine e apontando para pasta de views
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configurando pastas estáticas e configurando o body-parser
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ver os Links que a pessoa conectou e o tempo de resposta
app.use(morgan('dev'));

//configurando o consign para o autoload das pastas
consign()
    .include('app/controllers')
    .then('app/classesApoio')
    .then('app/routes')
    .into(app);

module.exports = app;