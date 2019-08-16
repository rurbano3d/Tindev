import React , { useEffect , useState} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }){

    const[users, setUsers] = useState([]); //estado de um variavel
    const[matchDev, setMatchDev] =useState(null);

    useEffect(() => { //cada vez que mudar o id no headers alterar a informação renderizada
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [ match.params.id ]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`,null,{
            headers: { user:match.params.id },
        })

        setUsers(users.filter(user => user._id !== id)); //utiliza o estado de atualização setUsers e filtra para que não apareça o usuario 
    }
    //cada vez que mudar o id no headers alterar a informação renderizada
    useEffect(()=>{
        const socket = io ('http://localhost:3333', {
            query: {user: match.params.id }
        }); //conexão com o backend atraves do socket e enviando um parametro na query para o backend

        socket.on('match', dev =>{
            setMatchDev(dev)
        })
       
    },[match.params.id]);
    

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`,null,{
            headers: { user:match.params.id },
        })

        setUsers(users.filter(user => user._id !== id)); //utiliza o estado de atualização setUsers e filtra para que não apareça o usuario 
    }

    return (
        <div className="main-container">
            <Link to="/"><img src={logo} alt="tindev"/></Link>
            
            { users.length > 0 ?( //if tamanho dos usuario for maior que 0 faça
                <ul>
                {users.map(user => (
                    <li key={user._id}>
                    <img src={user.avatar} alt={user.name}/>
                    <footer>
                        <strong>{user.name}</strong>
                        <p>{user.bio}</p>
                    </footer>

                    <div className="buttons">
                        <button type="button" onClick={() => handleDislike(user._id)}>
                            <img src={dislike} alt="dislike"/>
                        </button>
                        <button type="button" onClick={() => handleLike(user._id)}>
                            <img src={like} alt="like"/>
                        </button>
                    </div>
                </li>
                ))}
                
            </ul>
            ) : ( //senao
                <div className="empty">Acabou :( </div>
            ) }
            { matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt=""/>
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type='button' onClick={()=>setMatchDev(null)}>FECHAR</button>
                </div>
                
            )}
        </div>
    )
}