import React from 'react';
import { useGameContext } from '../../../context/GameContext';

const GameStats: React.FC = () => {
    const {
        gameState,
    } = useGameContext();

    return (
        <div className='flex flex-row stats'>
            <h2>Time Left: {gameState.timeLeft} seconds</h2>
            <h2>Score: {gameState.score}</h2>
        </div>
    );
};

export default GameStats;