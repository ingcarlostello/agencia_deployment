const Viaje = require('../models/Viajes')
const Testimonial = require('../models/Testimoniales')

exports.consultasHomePage = async (req, res) =>{   
    
    const viajes = await Viaje.findAll({limit:3})
    
    const testimoniales = await Testimonial.findAll({
        limit:3 //*metodo de sequelize para traer todos los resultados de una tabla de la BD
    })

    res.render('index', {
        pagina: 'Proximos Viajes',
        clase:'home',
        viajes:viajes,
        testimoniales: testimoniales
    })  
}