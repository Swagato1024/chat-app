const net = require("node:net");

const client = net.createConnection({ port: 8000 });

const onData = (message) => {
  client.write(message);
};

const display = (message) => {
  console.log(message);
};

client.on("connect", () => {
  client.setEncoding("utf-8");
  console.log("client is connected");

  client.on("data", (data) => {
    display(data);

    setInterval(() => {
      process.stdin.setEncoding("utf-8");
      const data = process.stdin.read();
      if (!data) return;

      onData(data);
    }, 1000);
  });
});
