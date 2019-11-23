import React, {useState} from 'react';
import api from '../../services/api';

export default function Formulario(){
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
  
    async function handleSubmit(event){
        event.preventDefault();
      
        const response = await api.post('/clients', { name , phone, email});
        const {_id} = response.data;
        this.setEmail = "";
        this.setPhone = "";
        this.setName = "";
        console.log(_id);
    }

    return (
        <dl>
            <h3>Tela de Cadastro</h3>

            <form onSubmit={handleSubmit}>

                <label htmlFor="nome">Nome:</label>
                <input 
                type="text"
                id="nome"
                placeholder="Seu Nome"
                value={name}
                onChange={event => setName(event.target.value)}
                />

                <label htmlFor="fone">Telefone:</label>
                <input 
                type="text" 
                id="fone"
                placeholder="Seu Telefone"
                value={phone}
                onChange={event => setPhone(event.target.value)}                  
                />

                <label htmlFor="fone">Email:</label>
                <input 
                type="email" 
                id="email"
                placeholder="Seu Melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
                />
                <button type="submit" className="btnEnviar">Enviar</button>
                    
            </form>
        </dl>
    )
}