import { useState, useRef } from "react";
export default function Player() {
  const input = useRef();

  const [playerName, setPlayerName] = useState("");

  function handleClick() {
    setPlayerName(input.current.value);
    input.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : "unknown entity"}</h2>
      <p>
        <input
          ref={input}
          type="text"
          onKeyUp={(e) => (e.keyCode === 13 ? handleClick() : null)}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
