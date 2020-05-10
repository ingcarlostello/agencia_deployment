const Testimonial = require('../models/Testimoniales')

exports.mostrarTestimoniales = async (req, res) =>{ 
    const testimoniales = await Testimonial.findAll() //*metodo de sequelize para traer todos los resultados de una tabla de la BD
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales:testimoniales
    })
}


//cuando se llena el formulario, se utilizo body parser
exports.agregarTestimonial = async (req, res) =>{ 
    let {nombre, correo, mensaje} = req.body
    let errores = []
     if(!nombre){
        errores.push({'mensaje' : 'Agrega tu Nombre'})
     }
     if(!correo){
         errores.push({'mensaje' : 'Agrega tu Correo'})
     }
     if(!mensaje){
         errores.push({'mensaje' : 'Agrega tu Mensaje'})
     }

     if (errores.length > 0 ){
         const testimoniales = await Testimonial.findAll()
         res.render('testimoniales',{
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
         })
     }
     else{
         Testimonial.create({
             nombre,
             correo,
             mensaje
         })
         .then(testimonial => res.redirect('/testimoniales'))
         .catch(error => console.log(error))

     }
 }