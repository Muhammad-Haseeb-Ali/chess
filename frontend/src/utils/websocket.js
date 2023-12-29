import { io } from "socket.io-client";
import { getCookie } from "./readCookies";
import { toast } from "react-toastify";

const baseUrl = "http://54.144.87.229:5000";

const connectToSocket = (
  endpoint,
  roomId,
  updateSide,
  updateMove,
  updateStatus
) => {
  console.log("asda", endpoint, `${baseUrl}${endpoint}`,);
  const userId = getCookie("user_id");

  const socket = io(`${baseUrl}${endpoint}`, {
    path: "/socket",
    query: {
      roomId,
      userId,
    },
  });

  // socket.on("connect", () => {
  //   socket.emit("joinRoom", { roomId });
  // });
  socket.on("userConnected", (data) => {
    if (data.userId === userId) {
      toast.success("You are connected to the Room");
    } else {
      toast.success("New user connected to the Room");
    }
  });

  socket.on("room-full", () => toast("room is already full"));
  socket.on("player-color", updateSide);
  socket.on("update-move", (e)=>{
    updateMove(e)
  });
  socket.on("wait-for-other-player", () =>
    updateStatus("Waiting For Second Player")
  );
  socket.on("start-game", () => updateStatus(null));

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
  socket.on("error", (error) => {
    console.log("Socket error:", error);
  });
  socket.on("reconnect", ({ fen, color }) => {
    console.log("data ", { fen, color });
    toast.success("reconnected to the server");
    updateSide({ color });
    updateMove(fen);
  });

  return socket;
};

export default connectToSocket;
