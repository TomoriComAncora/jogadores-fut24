import { useState, useEffect } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    async function loadJogadores() {
      const response = await api.get("rating/fc-24");

      const jogadoresData = response.data.items.slice(0, 50);
      
      // setJogadores(response.data.items.slice(0, 20));
      const jogadoresComIdade = jogadoresData.map((jogador) => {
        const birthdateDate = new Date(jogador.birthdate);
        const today = new Date();
        const diffYears = today.getFullYear() - birthdateDate.getFullYear();
        const isBeforeBirthday = today.getMonth() < birthdateDate.getMonth() ||
          (today.getMonth() === birthdateDate.getMonth() && today.getDate() < birthdateDate.getDate());
        const idade = isBeforeBirthday ? diffYears - 1 : diffYears;
        return { ...jogador, idade };
      });
      console.log(jogadoresComIdade);
      setJogadores(jogadoresComIdade);
    
    }

    loadJogadores();
  }, []);
  // items.lastName
  return (
    <div>
      {jogadores.map((items, index) => (
        <article className="card" key={items.id}>
          <strong>
            {items.commonName !== null ? items.commonName : items.lastName}
          </strong>
          <img src={items.avatarUrl} alt={items.lastName} />
          <p>{items.nationality.label}</p>
          <p>{items.overallRating}</p>
          <p>
            {items.position.label}/{items.position.shortLabel}
          </p>
          <p>
            {items.skillMoves}/{items.weakFootAbility}
          </p>
          <p>Idade: {items.idade}</p>
        </article>
      ))}
    </div>
  );
}

export default App;
