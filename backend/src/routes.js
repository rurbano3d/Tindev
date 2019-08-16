const express = require ('express'); // microframework que ajuda nas routas, requisições e repostas
const DevController = require ('./controllers/DevController'); // controlador do desenvolvedores
const LikeController = require ('./controllers/LikeController');// controlador dos likes
const DislikeController = require ('./controllers/DislikeController');// controlador dos dislikes

const routes = express.Router(); // função para trabalhar com rotas do express

routes.get('/devs',DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes // exporta algo dentro do node para importar é .use