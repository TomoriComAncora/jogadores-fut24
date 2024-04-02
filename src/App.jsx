import { useState, useEffect } from 'react';
import api from './services/api';
import './App.css'

function App() {
  const [jogadores, setJogadores] = useState([]);

  useEffect(()=>{
    async function loadJogadores(){
      const response = await api.get('rating/fc-24?limit=100')

      console.log(response.data.items.slice(0,10));
      setJogadores(response.data.items.slice(0,20));
    }

    loadJogadores();
  }, [])

  // items.lastName
  return (
    <div>
      {jogadores.map((items)=>(
        <article className='card' key={items.id}>
          <strong>{items.commonName !== null ? items.commonName:items.lastName}</strong>
          <img src={items.avatarUrl} alt={items.lastName} />
          <p>{items.nationality.label}</p>
          <p>{items.overallRating}</p>
          <p>{items.position.label}/{items.position.shortLabel}</p>
          <p>{items.skillMoves}/{items.weakFootAbility}</p>
        </article>
      ))}
    </div>
  )
}

export default App
