const net = require("node:net");

const client = net.createConnection({ port: 8000 });

client.on("connect", () => {
  console.log("client is connected");
  client.write("Hii from client");

  setTimeout(() => {
    client.end();
  }, 2000);
});
