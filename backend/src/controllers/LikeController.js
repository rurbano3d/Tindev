const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers; // pega o user do headers
    const { devId } = req.params; // pega o devID da url, o comando params faz isso.

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exist' }); // http cods, codigos que começam com 400 quer dizer que o usuario informou alguma coisa errada
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      // includes se dentro do array de likes existir o id
      const loggedSocket = req.connectedUsers[user]; //pega socket se existir do usuario logado
      const targetSocket = req.connectedUsers[devId]; //pega socket se existir do alvo logado
      //verifica se estão logado
      if (loggedDev ) {
        req.io.to(loggedSocket).emit('match', targetDev); // estou avisando o usuario logado que ele deu um match no target
      }
      if (targetDev ) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id); // como o loggedDev.likes é um array, para adicionar você utiliza o push

    await loggedDev.save(); // para salvar as informações

    return res.json(loggedDev);
  }
};
