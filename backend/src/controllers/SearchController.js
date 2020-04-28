const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');



module.exports = {

    async index(request, response){
        // Buscar todos os devs, num raio de 10km 
        // Filtrar por tecnologias 
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        //filtro
        const devs = await Dev.find({
            //retorna usuários que trabalham apenas nas tecnologias presentes no array "techsArray"
            techs: {
                $in: techsArray,
            },

            //retorna usuários localizados a uma distancia de 10km
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }    
            }
        });
        
        return response.json({ devs })
    }
    
}