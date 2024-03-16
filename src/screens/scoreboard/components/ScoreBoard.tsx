import React from "react";
import BoardActions from "./BoardActions";
import BoardTable from "./BoardTable";
import { useGameContext } from "../../../context/GameContext";

const ScoreBoard: React.FC = () => {

    const {
        gameState,
        handlePlayAgain,
        handleReturnToWelcome,
    } = useGameContext();

    return (
        <div className="flex">
            <BoardTable players={gameState.players} />
            <BoardActions
                onPlayAgain={handlePlayAgain}
                onReturnToWelcome={handleReturnToWelcome}
            />
        </div>
    );
};

export default ScoreBoard;