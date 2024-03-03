const net = require("node:net");
const { ChatRoom, Participant } = require("./chatroom");

const server = net.createServer();
const PORT = 8000;

let id = 0;

const participants = [];

const broadcast = (userName, data) => {
  participants.forEach(({ socket }) => {
    socket.write(`${userName}: ${data}`);
  });
};

const onEntry = (name) => {
  participants.forEach(({ socket }) => {
    socket.write(`${name} joined`);
  });
};

const onLeave = (name) => {
  participants.forEach(({ socket }) => {
    socket.write(`${name} left`);
  });
};

const addToChatRoom = (chatRoom, socket) => {
  socket.setEncoding("utf-8");
  const prompt = "Enter your name";
  socket.write(prompt);

  socket.once("data", (data) => {
    const name = data.trim();
    // onEntry(name);

    chatRoom.register(name, socket);

    // participants.push({ name, socket });
    // socket.on("data", (message) => broadcast(name, message));

    socket.on("end", () => {
      onLeave(name);
    });
  });
};

const main = () => {
  const chatServer = net.createServer();
  chatServer.listen(PORT, () => {
    console.log("chat server is on");
  });

  const chatRoom = new ChatRoom();
  chatServer.on("connection", (socket) => addToChatRoom(chatRoom, socket));
};

main();
