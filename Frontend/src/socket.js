import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); // Adjust backend URL as needed
export default socket;
