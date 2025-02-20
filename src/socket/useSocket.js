import { useEffect, useState } from "react";
import { connectSocket } from "../socket/socket";

const useSocket = (userId) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = connectSocket(userId);
    newSocket.connect();

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket with userId:", userId);
    });

    newSocket.on("user-notification", (message) => {
      const jsonData = JSON.parse(message);
      setMessages((prev) => [...prev, jsonData]);
      console.log(jsonData);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("user-notification");
      newSocket.disconnect();
    };
  }, [userId]);

  return { socket, messages };
};

export default useSocket;
