import { useState, useEffect } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    async function loadJogadores() {
      const response = await api.get("rating/fc-24?limit=100");

      console.log(response.data.items.slice(0, 10));
      let jogadoresData = response.data.items.slice(0, 20);

      const jogadoresComIdade = jogadoresData.map((items) => {
        const aniversario = new Date(items.birthdate);
        const hoje = new Date();
        const difrencaAno = hoje.getFullYear() - aniversario.getFullYear();
        const dataAntes =
          hoje.getMonth() < aniversario.getMonth() ||
          (hoje.getMonth() === aniversario.getMonth() &&
            hoje.getDate < aniversario.getDate());
        const idade = dataAntes ? difrencaAno - 1: difrencaAno;
        return{...items, idade}
      });

      setJogadores(jogadoresComIdade);
    }

    loadJogadores();
  }, []);

  // items.lastName
  return (
    <div>
      {jogadores.map((items) => (
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
          <p>{items.idade}</p>
        </article>
      ))}
    </div>
  );
}

export default App;