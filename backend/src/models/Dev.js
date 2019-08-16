const { Schema, model } = require ('mongoose');// utiliza a dependêndica Schema (nossa estrutura do BD) e o model

const DevSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    user: {
        type:String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    // armazena uma array por isso o [ ] antes das chaves
    likes: [{
        type:Schema.Types.ObjectId, // para pegar o id do banco de dados, quase um relaciomento, uma chave estrangeira
        ref: 'Dev', // referente ao model Dev
    }],
    dislikes: [{
        type:Schema.Types.ObjectId,
        ref: 'Dev',
    }],

}, {
    timestamps: true, //cria o createdAt e o updateAt
});

module.exports = model('Dev',DevSchema); //exportando 