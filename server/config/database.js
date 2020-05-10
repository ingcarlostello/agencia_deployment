const Sequelize = require('sequelize');
require('dotenv').config({path: 'variables.env'})

//* configuracion general para conectar con base de datos
module.exports = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    //host: '127.0.0.1',
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps:false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    operatorsAliases: 0,
  
    
});