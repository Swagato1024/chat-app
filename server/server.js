const net = require("node:net");

const server = net.createServer();
const PORT = 8000;

let id = 0;

server.on("connection", (socket) => {
  const clientId = id;
  id++;
  console.log("connection estb");

  socket.on("data", (data) => {
    console.log(`server side: ${data}`);
  });

  socket.on("end", () => {
    console.log("session ended");
    console.log(`${clientId} left`);
  });
});

server.listen(PORT, () => {
  console.log("listening");
});
