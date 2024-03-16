import { Fragment } from "react/jsx-runtime";
import { Player } from "../../../types/player";

interface BoardItemProps {
    index: number;
    player: Player;
}

const BoardItem: React.FC<BoardItemProps> = ({
    index,
    player,
}) => {
    return (
        <Fragment>
            <tr key={`item-${index}`}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.date}</td>
                <td>{player.score}</td>
            </tr>
        </Fragment>
    );
};

export default BoardItem;