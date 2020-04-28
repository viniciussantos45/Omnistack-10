const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const {findConnections, sendMessage} = require('../websocket');

module.exports = {        
    //Métodos HTTP get, post, put, delete

    //Tipos de parametros:
    //Query params: request.query (filtros, ordenação, paginação. ...)
    //Route params: request.params (Identificar um recurso na alteração ou remoção)
    //Body params: request.body formato JSON

    //O controller tem apenas 5 funções: 
    //index(lista), show(mostrar apenas um), store(cadastrar), update(editar), destroy(deletar)

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },
        
    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        //este método verifica se há um registro no deste usuário no DB 
        //caso não existir cadastra, executando bloco dentro do IF
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            // "name = login" caso o nome não exista, o nome vai ser igual ao login 
            const {name = login, avatar_url, bio } = apiResponse.data;
            
            //transforma a string que techs em um array, inclusive sem espaços no inicio e 
            // no fim de cada objeto utilizando trim() 
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude], 
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            //Filtrar as conexões que estão a no maximo 10km de distancia e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    }
}