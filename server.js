const net = require("net");

const server = net.createServer((socket) => {
  let value1 = undefined;
  let value2 = undefined;
  socket.on("data", (data) => {
    // console.log(`Received: ${data}`);
    // if (data.value) {
    //     value1 ? value2 = data.value : value1 = data.value
    // } else {
    //     socket.write(JSON.parse(data.toString()));
    // }

    if (JSON.parse(data.toString()).value) {
      value1
        ? (value2 = Number(JSON.parse(data.toString()).value))
        : (value1 = Number(JSON.parse(data.toString()).value));
      console.log(Number(JSON.parse(data.toString()).value));
    } else {
      if (JSON.parse(data.toString()).operation == "+") {
        console.log(value1 + value2);
        socket.write(JSON.stringify({ result: value1 + value2 }));
      } else if (JSON.parse(data.toString()).operation == "-") {
        console.log(value1 - value2);
        socket.write(JSON.stringify({ result: value1 - value2 }));
      } else if (JSON.parse(data.toString()).operation == "/") {
        console.log(value1 / value2);
        socket.write(JSON.stringify({ result: value1 / value2 }));
      } else {
        console.log(value1 * value2);
        socket.write(JSON.stringify({ result: value1 * value2 }));
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
