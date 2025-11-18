import { io } from "socket.io-client";

export const socket = io("https://ecommerce-order-tracking-backend-1.onrender.com", {
  transports: ["websocket"],
});
