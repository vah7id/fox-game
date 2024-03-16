import React, { useState } from 'react';
import { useGameContext } from '../../../context/GameContext';

const Welcome: React.FC = () => {
  const { gameState, startGame, updateGameState } = useGameContext();
  const { isReadyToStart } = gameState;
  const [playerNameInput, setPlayerNameInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerNameInput(e.target.value);
  };

  const handlePlayClick = () => {
    if (!isReadyToStart) {
      updateGameState({
        playerName: playerNameInput,
        isReadyToStart: true
      });
    } else {
      startGame();
    }
  };

  return (
    <div className="flex">
      {!isReadyToStart ? (
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerNameInput}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div>
          <h2>Hello {playerNameInput}</h2>
        </div>
      )}
      <button
        className={isReadyToStart ? 'btn-primary' : ''}
        onClick={handlePlayClick}
      >
        {isReadyToStart ? 'Play' : 'Start Game'}
      </button>
    </div>
  );
};

export default Welcome;