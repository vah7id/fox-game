// GameContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAnimalsQuery } from '../hooks/useAnimalsQuery';
import { GameState } from '../types/game';
import { TOTAL_GAME_DURATION } from '../types/enums';

type GameContextType = {
    gameState: GameState;
    startGame: () => void,
    handleReturnToWelcome: () => void,
    handlePlayAgain: () => void,
    updateScoreboard: () => void,
    updateGameState: (newState: Partial<GameState>) => void;
};

const initialState: GameState = {
    playerName: '',
    animals: [],
    score: 0,
    timeLeft: TOTAL_GAME_DURATION,
    isGameOver: false,
    players: [],
    isReadyToStart: false,
    isGameStarted: false
};

const GameContext = createContext<GameContextType>({
    gameState: initialState,
    updateGameState: () => { },
    startGame: () => { },
    updateScoreboard: () => { },
    handlePlayAgain: () => { },
    handleReturnToWelcome: () => { },
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(initialState);
    const { data: fetchedAnimals, refetch } = useAnimalsQuery({ enabled: gameState.isGameStarted });

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (gameState.isGameStarted) {
            timer = setInterval(() => {
                setGameState(prevState => ({
                    ...prevState,
                    isGameOver: prevState.timeLeft === 0,
                    timeLeft: prevState.timeLeft > 0 ? prevState.timeLeft - 1 : 0
                }));
                if (gameState.timeLeft === 0) {
                    updateScoreboard();
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameState.isGameStarted, gameState.timeLeft]);

    useEffect(() => {
        if (fetchedAnimals && fetchedAnimals.length > 0) {
            // Check if the fetched animals array is different from the current animals array
            const fetchedAnimalsString = JSON.stringify(fetchedAnimals);
            const currentAnimalsString = JSON.stringify(gameState.animals);

            // If the stringified arrays are different, update the gameState
            if (fetchedAnimalsString !== currentAnimalsString) {
                setGameState(prevState => ({
                    ...prevState,
                    animals: fetchedAnimals
                }));
            }
        }
    }, [fetchedAnimals, gameState.animals]);

    const updateGameState = (newState: Partial<GameState>) => {
        setGameState(prevState => ({
            ...prevState,
            ...newState
        }));
    };

    const updateScoreboard = () => {
        setGameState(prevState => {
            const updatedPlayers = prevState.players.filter(player => player.name !== prevState.playerName);
            const updatedPlayer = {
                name: prevState.playerName,
                score: prevState.score,
                date: new Date().toDateString()
            };
            updatedPlayers.push(updatedPlayer);

            // Sort the players by score in descending order
            updatedPlayers.sort((a, b) => b.score - a.score);

            return {
                ...prevState,
                players: updatedPlayers
            };
        });
    };

    const handlePlayAgain = () => {
        refetch();
        updateGameState({
            isGameOver: false,
            score: 0,
            timeLeft: TOTAL_GAME_DURATION
        });
    };

    const resetState = () => {
        updateGameState({
            playerName: '',
            animals: [],
            score: 0,
            timeLeft: TOTAL_GAME_DURATION,
            isGameOver: false,
            isReadyToStart: false,
            isGameStarted: false,
            players: [...gameState.players]
        });
    }

    const handleReturnToWelcome = () => {
        // Reset all game states before new game starts
        resetState();
        // Trigger the refetch of animal data when starting the game
        refetch();
    };

    const startGame = () => {
        if (!gameState.isReadyToStart) {
            updateGameState({ isReadyToStart: true });
        } else {
            updateGameState({ isGameStarted: true });
        }
    };

    return (
        <GameContext.Provider value={{
            gameState,
            updateGameState,
            handlePlayAgain,
            startGame,
            handleReturnToWelcome,
            updateScoreboard,
        }}>
            {children}
        </GameContext.Provider>
    );
};