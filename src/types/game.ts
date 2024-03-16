import { Animal } from "./animal";
import { Player } from "./player";

export interface GameState {
    playerName: string;
    animals: Animal[];
    score: number;
    timeLeft: number;
    isGameOver: boolean;
    players: Player[];
    isReadyToStart: boolean;
    isGameStarted: boolean;
}