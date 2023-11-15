import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import MessageModel from "../3-models/message-model";

//this handle socket.io operations
function handleSocketIo(httpServer: HttpServer): void {
  //create the options - any client connect +use (cors)
  const options = { cors: { origin: "*" } };

  //create the socket.io server (its another server)
  const socketIoServer = new SocketIoServer(httpServer, options);

  //1) the server listen to client connections
  socketIoServer.sockets.on("connection", (socket: Socket) => {

    console.log("client is connected to socket.io server");

    //(4) listen to client messages:
    socket.on("msg-client: ", (message: MessageModel) => {
      console.log("client send msg: " , message);
      //send given message to all (socketS from line 13) of the clients
      socketIoServer.sockets.emit("msg-server: ", message);
    });


    //(7) server listen to client disconnect
    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });
  });
}
 
export default {
  handleSocketIo,
};
