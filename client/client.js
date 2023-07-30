const net = require("node:net");

const client = net.createConnection({ port: 8000 });

client.on("connect", () => {
  client.setEncoding("utf-8");
  console.log("client is connected");

  client.on("data", (data) => {
    process.stdout.clearLine();
    console.log(data);

    const intervalId = setInterval(() => {
      process.stdin.setEncoding("utf-8");
      const data = process.stdin.read();
      if (!data) return;

      client.write(data);
    }, 1000);
  });
});
