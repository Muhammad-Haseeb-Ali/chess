const events = require("./eventhandlers");

const rooms = new Map();

module.exports = function (io) {
  const Game = io.of("/vsfriend");

  Game.on("connection", async (socket) => {
    const { userId, roomId } = socket.handshake.query;

    // socket.on("joinRoom", async () => {
    if (!rooms.has(roomId)) {
      rooms.set(`${roomId}`, {
        fen: "",
        players: new Map([[userId, { color: "w" }]]),
      });

      await socket.join(roomId);
      Game.to(roomId).emit("userConnected", { userId });
      socket.emit("player-color", { color: "w" });
      Game.to(roomId).emit("wait-for-other-player");
    } else {
      const players = rooms.get(roomId).players;
      if (players.has(userId)) {
        const { fen } = rooms.get(roomId);
        const { color } = rooms.get(roomId).players.get(userId);
        socket.join(roomId);
        socket.emit("reconnect", { fen, color });
        Game.to(roomId).emit("start-game");
      } else {
        if (players.size === 2) {
          socket.emit("room-full");
          return;
        }
        players.set(userId, { color: "b" });
        await socket.join(roomId);
        socket.emit("player-color", { color: "b" });
        Game.to(roomId).emit("start-game");
      }
    }
    // });
    socket.on("move", events.handleMove(Game, roomId, rooms));
    socket.on("disconnect", events.handleDisconnect(Game, roomId));
  });
};
