import React, {useState} from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({history}){ // export default é uma forma de exportar o componente ou poderia colcoar no fim da pagina export default Login;
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();//anula o padrão do submit que era acessar outra pagina
        const response = await api.post('/devs', {
           username, 
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" /> 
                <input
                    placeholder="Digite seu usuário no github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
            
        </div>
        
    );
}

