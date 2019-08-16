const axios = require('axios'); //pacote para fazer requisição em APIs externas
const Dev = require ('../models/Dev');//importa o modelo DEV

module.exports = {
    async index(req, res){ // sempre que utilizar o await é preiso colocar async. Para quando tiver que obter resposta do BD
        const { user } = req.headers; //pega o id do user na Header

        const loggedDev = await Dev.findById(user); // Select * from dev Where id = user e instancia na constant loggedDev

        const users = await Dev.find({ // Select * from dev WHERE id != user AND id != loggedDev.likes AND id != loggedDev.dislikes
            $and: [ // este $and diz que a condição tem que passar nos 3 filtros abaixo
                  { _id: { $ne: user } },//$ne - not equal
                  { _id: { $nin: loggedDev.likes } },//$nin - not include dentro de um vetor (array)
                  { _id: { $nin: loggedDev.dislikes } },

            ],
        })

        return res.json(users);
    },


    async store(req,res) {
        const {username} = req.body; // pega o username dentro do body

        const userExists = await Dev.findOne({ user: username }); 

        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data; // no avatar estou dizendo que na api é avatar_url mas no meu BD é avatar.

        const dev = await Dev.create({ //esta salvando as info do response.data para o BD
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
}