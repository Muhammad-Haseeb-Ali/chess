const socketIO = require("socket.io");

const playWithFriends = require("./namespaces/playWithFriends");
const playWithAI = require("./namespaces/playWithAI");
const playOnline = require("./namespaces/playOnline");

var server = (httpserver) => {
  const io = socketIO(httpserver, {
    path: "/socket",
    cors: {
      origin: "*", // Add your frontend's origin
      methods: ["GET", "POST"],
    },
  });
  playWithFriends(io);
  playWithAI(io);
  playOnline(io);
};

module.exports = server;
