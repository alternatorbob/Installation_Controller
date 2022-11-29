let ws = new WebSocket("wss://touchdesigner-controller.herokuapp.com/:443");

// let controllTD = document.querySelector(".controllTD");
// console.log(controllTD);
// controllTD.addEventListener(
//   "input",
//   (event) => {
//     console.log(controllTD.value);
//     ws.send(JSON.stringify({ slider1: controllTD.value / 100 }));
//   },
//   false
// );

//this.change function on line 775 of jquery.kontrol.js in k.XY section
function sendData(c, x, y) {
  // console.log(x, y);
  switch (c) {
    case 1:
      ws.send(JSON.stringify({ slider1: x }));
      ws.send(JSON.stringify({ slider2: y }));
      break;
    case 2:
      ws.send(JSON.stringify({ slider3: x }));
      ws.send(JSON.stringify({ slider4: y }));
  }
}

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
