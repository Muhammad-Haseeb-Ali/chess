import { socket } from "../pages/game/gameBoard";
export const emit = {
  joinRoom: () => {
    socket?.emit("joinRoom");
  },
  move: (fen) => socket.emit("move", fen),
};
