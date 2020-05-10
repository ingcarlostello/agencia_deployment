//? ------------------------------------------Archivo de configuracion del servidor-----------------------------------------------
// TODO: 1) crear el servidor de express
//* Importar express
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes');
const path = require('path'); //accedera al file system

const configs = require ("./config")

const db = require('./config/database')

require('dotenv').config({path: 'variables.env'})


//! probar si funcina la conexion a la BD
db.authenticate()
    .then(() => console.log('DB Conectada'))
    .catch(error => console.log(error))

//* Confugurar express
const app = express();

//* habilitando pug
app.set('view engine', 'pug')

//* añadir las vistas
app.set('views', path.join(__dirname, './views'))

//* cargar carpet estatica public
app.use(express.static('public'))

//* validar si esta en desarrollo o produccion
const config = configs[app.get('env')] // env es una variable de node para detectar el ambiete de desarrollo en el que se esta


//creamos variable para el sitio web
app.locals.titulo = config.nombresitio;


//* muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // crea una nueva fecha
    const fecha = new Date();
    // res.locals.fechaActual = fecha.getFullYear(); // res.local es un objeto que contiene variables locales
    app.locals.fechaActual = fecha.getFullYear()

    res.locals.ruta = req.path;
    return next();
})


//ejecutamos el body-parser
app.use(bodyParser.urlencoded({extended: true}))


//cargar las rutas
app.use('/', routes()) //.use() responde a todos los verbos de http (put, delete, post, etc)


//puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log("Elservidor esta funcionando")
});