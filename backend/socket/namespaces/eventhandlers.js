const handleDisconnect = (Game, roomId) => {
  return () => {
    roomId && Game.to(roomId).emit("wait-for-other-player");
  };
};
const handleMove = (Game, roomId, rooms) => {
  return (data) => {
    const room = rooms.get(roomId);
    if (room) {
      room.fen = data;
      rooms.set(roomId, room);
    }
    Game.to(roomId).emit("update-move", data);
  };
};

module.exports = { handleDisconnect, handleMove };
