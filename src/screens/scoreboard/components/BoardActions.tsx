import React from "react";

interface BoardActionsProps {
    onPlayAgain(): void;
    onReturnToWelcome(): void;
}

const BoardActions: React.FC<BoardActionsProps> = ({
    onPlayAgain,
    onReturnToWelcome,
}) => {
    return (
        <div className="flex-row">
            <button onClick={onPlayAgain} className="btn-primary">
                Play Again
            </button>
            <button onClick={onReturnToWelcome} className="btn-primary">
                To Welcome Screen
            </button>
        </div>
    );
};

export default BoardActions;