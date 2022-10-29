let ws = new WebSocket("wss://touchdesigner-controller.herokuapp.com/:443");

let controllTD = document.querySelector(".controllTD");
controllTD.addEventListener(
  "input",
  (event) => {
    ws.send(JSON.stringify({ slider1: controllTD.value / 100 }));
  },
  false
);

const transitionCheck = document.querySelector(".switch");
transitionCheck.addEventListener(
  "input",
  (event) => {
    console.log(transitionCheck.checked)
    ws.send(JSON.stringify({ button3: transitionCheck.checked }));
  },
  false
);

const manualTranstition = document.querySelector("#manual_transition");
manualTranstition.addEventListener(
  "click",
  (event) => {
    console.log(event)
    ws.send(JSON.stringify({ button4: manualTranstition.checked }));
  },
  false
);

let controlledByTD = document.querySelector(".controlledByTD");

ws.addEventListener("open", (event) => {
  console.log("Socket connection open");
  // alert('Successfully connected to socket server 🎉');
  ws.send("pong");
});

ws.addEventListener("message", (message) => {
  if (message && message.data) {
    if (message.data === "ping") {
      console.log("got ping");
      ws.send("pong");
      return;
    }
    let data = JSON.parse(message.data);
    if (data) {
      if ("slider1" in data) {
        controlledByTD.value = data["slider1"] * 100;
      }
      console.log("got data", data);
    }
  }
  console.log("message", message);
});

ws.addEventListener("error", (error) => {
  console.error("Error in the connection", error);
  alert("error connecting socket server", error);
});

ws.addEventListener("close", (event) => {
  console.log("Socket connection closed");
  alert("closing socket server");
});
