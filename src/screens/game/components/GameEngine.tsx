import React, { Suspense, useEffect, useState } from 'react';
import { useGameContext } from '../../../context/GameContext';
import { useAnimalsQuery } from '../../../hooks/useAnimalsQuery';
import { AnimalTypes } from '../../../types/animal';
import GameStats from './GameStats';
import GameLoading from './GameLoading';

// Lazy load the image component
const LazyImage = React.lazy(() => import('./LazyImage'));

const GameEngine: React.FC = () => {

    const {
        gameState,
        updateGameState,
    } = useGameContext();

    const { isLoading, isFetching, refetch } = useAnimalsQuery({ enabled: gameState.isGameStarted });
    const [isImagesLoaded, setImagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (isLoading || isFetching) {
            setImagesLoaded(false);
        } else {
            // Render new images with a 200ms delay
            setTimeout(() => setImagesLoaded(true), 500);
        }
    }, [isLoading, isFetching]);

    const handleOnAnimalClick = (type: AnimalTypes) => {
        updateGameState({
            ...gameState,
            score: type === 'fox' ? gameState.score + 1 : gameState.score - 1,
            animals: [],
        });
        refetch();
    };

    return (
        <div className="flex">

            <GameStats />
            <GameLoading isLoading={!isImagesLoaded} />

            {/* Suspense for lazy loading the image component */}
            <Suspense
                fallback={<GameLoading isLoading={true} />}
            >
                <div className="grid" style={{ opacity: !isImagesLoaded ? 0 : 1 }}>
                    {gameState.animals &&
                        gameState.animals.map((animal, index) => (
                            <LazyImage
                                key={index}
                                width={'200px'}
                                height={'200px'}
                                src={animal.image}
                                alt={animal.type}
                                onClick={() => handleOnAnimalClick(animal.type)}
                            />
                        ))}
                </div>
            </Suspense>
        </div>
    );
};

export default GameEngine;