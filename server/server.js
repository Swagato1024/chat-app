const net = require("node:net");

const server = net.createServer();
const PORT = 8000;

let id = 0;
const clients = [];

const broadcast = (userName, data) => {
  clients.forEach(({ socket }) => {
    socket.write(`${userName}: ${data}`);
  });
};

server.on("connection", (socket) => {
  socket.setEncoding("utf-8");
  socket.write("Enter your name");

  const clientId = id;
  id++;
  console.log("connection estb");

  socket.once("data", (data) => {
    const userName = data.trim();
    clients.push({ userName, socket });
    socket.on("data", (data) => broadcast(userName, data));
  });

  socket.on("end", () => {
    console.log(`${clientId} left`);
  });
});

server.listen(PORT, () => {
  console.log("listening");
});
