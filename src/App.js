import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { saveAs } from 'file-saver';  // Importa a biblioteca file-saver
import './App.css';

function App(){
  return(
    <div className="App-header">
      <Header/>
      <main>
        <p>Componente do semestre 2024/2</p>
        {ListaDeDisciplinas()}
      </main>
      <Footer/>
    </div>
  );
}

function ListaDeDisciplinas() {
  // Estado para armazenar na lista de disciplinas, a nova disciplina, o turno e as observações
  const [lista, setLista] = useState(['PW4', 'TC2', 'PDM']);
  const [novaDisciplina, setNovaDisciplina] = useState('');
  const [turno, setTurno] = useState('M');  // Estado para armazenar o turno
  const [observacao, setObservacao] = useState('');  // Estado para armazenar as observações

  // Função para lidar com a mudança de valor do input disciplina
  const handleChangeDisciplina = (event) => {
    setNovaDisciplina(event.target.value);
  };

  // Função para lidar com a mudança de valor do turno
  const handleChangeTurno = (event) => {
    setTurno(event.target.value);
  };

  // Função para lidar com a mudança de valor das observações
  const handleChangeObservacao = (event) => {
    setObservacao(event.target.value);
  };

  // Função para adicionar uma nova disciplina à lista
  const adicionarDisciplina = () => {
    if (novaDisciplina.trim() !== '') {
      setLista([...lista, novaDisciplina]);
      setNovaDisciplina('');
    }
  };

  // Função para capturar a tecla Enter e adicionar a disciplina à lista
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      adicionarDisciplina();
    }
  };

  // Função para salvar as informações da agenda em um arquivo de texto
  const salvarAgenda = () => {
    const agenda = `
      Disciplinas: ${lista.join(', ')}
      Turno: ${turno === 'M' ? 'Matutino' : turno === 'V' ? 'Vespertino' : 'Noturno'}
      Observações: ${observacao}
    `;
    const blob = new Blob([agenda], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'agenda_professor.txt');
  };

  return (
    <div>
      <div>
        <h1>Lista de disciplinas</h1>
        <input
          type="text"
          value={novaDisciplina}
          onChange={handleChangeDisciplina}
          onKeyPress={handleKeyPress}  // Adiciona a função de capturar Enter
          placeholder="Nova disciplina"
        />
        <button onClick={adicionarDisciplina}>Adicionar</button>
        <ul>
          {lista.map((disciplina, index) => (
            <li key={index}>{disciplina}</li>  // Renderiza cada disciplina como um item de lista
          ))}
        </ul>    
      </div>

      <div>          
        <p>Selecione o turno:</p>
        <label>
          <input 
            type="radio" 
            name="options" 
            value="M" 
            checked={turno === 'M'} 
            onChange={handleChangeTurno} 
          /> Matutino
        </label>
        <label>
          <input 
            type="radio" 
            name="options" 
            value="V" 
            checked={turno === 'V'} 
            onChange={handleChangeTurno} 
          /> Vespertino
        </label>
        <label>
          <input 
            type="radio" 
            name="options" 
            value="N" 
            checked={turno === 'N'} 
            onChange={handleChangeTurno} 
          /> Noturno
        </label>  
      </div>

      <div>
        <p>Observações da sala de aula:</p>
        <textarea
          value={observacao}
          onChange={handleChangeObservacao}
          placeholder="Digite suas observações"
        />
      </div>

      <button onClick={salvarAgenda}>Salvar Agenda</button>
    </div> 
  );
}

export default App;