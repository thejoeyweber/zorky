import React, { useState, useEffect } from "react";
import { createInitialGameState, GameState } from "../engine/game-state";
import { handleCommand } from "../engine/actions";

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [transcript, setTranscript] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");

  const processCommand = (cmd: string) => {
    const response = handleCommand(gameState, cmd);
    const newTranscript = [...transcript];
    newTranscript.push("> " + cmd);
    newTranscript.push(response);
    setTranscript(newTranscript);

    // increment moves
    gameState.moves += 1;
    setGameState({ ...gameState });
  };

  const onSubmitCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if(!command.trim()) return;
    processCommand(command.trim());
    setCommand("");
  };

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>Modern Zork Remake</h1>
      <div style={{ border: "1px solid #333", height: "300px", overflowY: "auto", padding: "5px" }}>
        {transcript.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <form onSubmit={onSubmitCommand} style={{ marginTop: 10 }}>
        <input
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          style={{ width: "80%" }}
          placeholder="Type a command..."
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};