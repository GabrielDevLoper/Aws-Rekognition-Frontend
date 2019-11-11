import React from 'react';
import './App.css';
import api from './services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  function handleSubmit(event){
    event.preventDefault();
    
  }



  return (
    <div className="container">
     <div className="content">
       <form onSubmit={handleSubmit}>
          <button className="btn"type="submit">Cadastrar Clientes</button>
       </form>
       <form>
       <button className="btn" type="submit">Reconhecimento Facial</button>
       </form>
     </div>
     <div>
     </div>
    </div>
    
    
  );
}

export default App;
