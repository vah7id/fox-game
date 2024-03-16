import React, { Fragment } from "react";
import { Player } from "../../../types/player";
import BoardItem from "./BoardItem";
import BoardTableContent from "./BoardTableContent";

interface BoardActionsProps {
    players: Player[],
}

const BoardTable: React.FC<BoardActionsProps> = ({
    players
}) => {
    return (
        <Fragment>
            <h2>Scoreboard</h2>
            <BoardTableContent>
                {players.map((player, index) => (
                    <BoardItem player={player} key={`ply-${index}`} index={index} />
                ))}
            </BoardTableContent>
        </Fragment>
    );
};

export default BoardTable;