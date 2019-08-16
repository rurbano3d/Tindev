import React from 'react'; // a biblioteca react
import ReactDOM from 'react-dom'; // a biblioteca onde vamos utilizar o react no caso webbrowser, DOM arvore de elementos da nossa aplicação
import App from './App';

//nosso componente global.
ReactDOM.render(<App />, document.getElementById('root'));// rederizando alguma coisa <App /> dentro da nossa div root que esta em public/index.html


