import React, { useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// Componente 
//   É uma função que retorna um conteúdo HTML, CSS ou JavasCript

// Estado
//   Informação que vai ser lida e atualizada pelo próprio componente

// Propriedade
//   É praticamente um "Atributo" ex: title = "nome" ou informaçãoes que um componente pai
//   passa pro componente filho

// Sempre que alterar um valor deverá também alterar o estado dele

function App() {

  const [devs, setDevs] = useState([]);

  //função para listar os devs apenas uma vez
  useEffect(()=>{
    async function loadDevs (){
      const response = await api.get('/devs');

      setDevs(response.data)
    }
    loadDevs();
  }, [])

  //função que cadastra um dev
  async function handleAddDev(data){

    const response = await api.post('/devs', data);

    //A chamada abaixo faz um append do novo dev cadastrado na lista de devs ja existente
    setDevs([...devs, response.data]);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit = {handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
            />
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
