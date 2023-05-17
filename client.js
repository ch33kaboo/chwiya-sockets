const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 3000 }, () => {
  console.log("Connected to server!");
  rl.question("Enter the first value: ", (firstValue) => {
    client.write(JSON.stringify({ value: firstValue }));
    rl.question("Enter the second value: ", (secondValue) => {
      client.write(JSON.stringify({ value: secondValue }));
      rl.question(
        "Enter the operation you want to perform (*, +, -, +): ",
        (operation) => {
          client.write(JSON.stringify({ operation: operation }));
        }
      );
    });
  });
});

client.on("data", (data) => {
  console.log(JSON.parse(data.toString("utf8")).result);
});

client.on("end", () => {
  console.log("Disconnected from server");
  rl.close();
});
