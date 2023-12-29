const events = require("./eventhandlers");

const inGamePlayers = new Map();
const rooms = new Map();
const waitingPlayers = [];

module.exports = function (io) {
  const randomGame = io.of("/vsrandom");

  randomGame.on("connection", async (socket) => {
    console.log("playonline", socket.id);

    const { userId } = socket.handshake.query;
    if (!inGamePlayers.has(userId)) {
      waitingPlayers.push({ userId, socketId: socket.id });
      if (waitingPlayers.length < 2) {
        socket.emit("wait-for-other-player");
      } else {
        const player1Socket = randomGame.sockets.get(
          waitingPlayers.shift().socketId
        );
        const player2Socket = randomGame.sockets.get(
          waitingPlayers.shift().socketId
        );
        const roomId = `room${player1Socket.id},${player2Socket.id}`;

        // console.log("data", player1Socket.roomId, player2Socket.roomId);

        player1Socket.join(roomId);
        player2Socket.join(roomId);
        // inGamePlayers.set(player1Socket, { roomId, color: "w", fen });

        player1Socket.emit("player-color", { color: "w" });
        player2Socket.emit("player-color", { color: "b" });
        player1Socket.on("move", events.handleMove(randomGame, roomId, rooms));
        player2Socket.on("move", events.handleMove(randomGame, roomId, rooms));

        randomGame.to(roomId).emit("start-game");
      }
    } else {
      const { roomId, color, fen } = inGamePlayers.get(userId);
      socket.join(roomId);
    }

    socket.emit("userConnected", { userId });

    // socket.on("disconnect", events.handleDisconnect(randomGame, roomId));
  });
};
