const Viaje = require('../models/Viajes')

exports.mostrarViajes = async (req, res) =>{ 
    const viajes = await Viaje.findAll() //*metodo de sequelize para traer todos los resultados de una tabla de la BD
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes:viajes
    });
    
}

exports.mostrarUnViaje = async (req, res) =>{ 
    const unicoViaje = await Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje: unicoViaje
    })        
}