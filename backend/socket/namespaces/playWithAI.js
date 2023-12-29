const Stockfish = require("../../utils/stockfishUtils");
const cl = require("../../utils/consolesUtils")

module.exports = function (io) {
  const vsComp = io.of("/vscomp");

  vsComp.on("connection", async (socket) => {
    console.log("vscomp", socket.id);
    const { userId, roomId } = socket.handshake.query;
    cl.d({userId})
    socket.emit("userConnected", { userId });

    const stockfish = new Stockfish()
    
    socket.on("move", async (data) => {
      console.log("move: ", data)
      stockfish.getAiMove(data, move=>{
        socket.emit("update-move", move);
      })
    });

    socket.on("disconnect", () => {
      cl.d("A user disconnected");
    });
  });
};
