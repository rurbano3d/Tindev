const express = require('express'); //importa a biblioteca express, microframework, que ajuda com rotas, requisições e repostas
const mongoose = require('mongoose'); // é um ODM , ferramenta que facilita o trabalho com o banco de dados
const cors = require('cors'); //para que nossa aplicação seja acessada por qualquer endereço

const routes = require('./routes'); // importa o arquivo routes.js

const app = express(); //cria um novo servidor, uma nova porta

const server = require('http').Server(app); //diz que o server recebe o protocolo http e também o protocolo Websocket
const io = require('socket.io')(server); // importo a dependencia do websocket o socket.io

//armazenar as infos dentro da memoria do node, mas o correto seria armazenar no BD
const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query; // atraves da desestruturação eu pego o user do query enviado pelo frontend

  connectedUsers[user] = socket.id; //relacionar o _id do usuario com o id do socket
});

//conexão com o MongoBd admin:admin ( login:senha), /omnistack8 (nome do BD)
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-u0sgy.mongodb.net/omnistack8?retryWrites=true&w=majority',
  {
    useNewUrlParser: true // aqui você esta dizendo que esta utilizando o novo fomrato de url
  }
);

//Para o controller ter acesso as informações do websocket eu utilizo o middleware, basicamente um interceptador
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next(); // continua
});

app.use(cors()); // vai utilizar a dependência CORS
app.use(express.json()); //. use é para importar algo do node . json() para entender que utilizaremos o json
app.use(routes);

server.listen(3333); //config da porta 3333
