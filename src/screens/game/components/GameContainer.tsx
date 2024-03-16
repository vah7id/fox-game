import React, { Fragment } from 'react';
import ScoreBoard from '../../scoreboard/components/ScoreBoard';
import Welcome from '../../welcome/components/Welcome';
import GameEngine from './GameEngine';
import { useGameContext } from '../../../context/GameContext';

const GameContainer: React.FC = () => {

    const { gameState } = useGameContext();

    const isGameOver = gameState.isGameOver;
    const isGameStarted = gameState.isGameStarted;

    return (
        <Fragment>
            {isGameOver ?
                <ScoreBoard /> :
                <Fragment>
                    {!isGameStarted ? (
                        <Welcome />
                    ) : (
                        <GameEngine />
                    )}
                </Fragment>
            }
        </Fragment>);
};

export default GameContainer;