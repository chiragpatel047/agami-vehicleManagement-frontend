import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000/users";

export const connectSocket = (userId) => {
  return io(SOCKET_URL, {
    query: { userId },
    autoConnect: false, // Prevent userId-connecting on import
  });
};
