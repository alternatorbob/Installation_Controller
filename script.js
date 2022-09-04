
let ws = new WebSocket('wss://new-socket-server.herokuapp.com:443');


ws.onopen = event => {
  console.log('Socket connection open');
  // alert('Successfully connected to socket server 🎉');
  ws.send('pong');
}

ws.onmessage = (message) => {
  if(message && message.data && message.data === 'ping') {
    console.log('got ping')
    ws.send('pong');
  }
  // let message1 = JSON.parse(message);
  
  console.log('message', message1)
}

ws.onerror = (error) => {
  console.log('Error in the connection', error);
  alert('error connecting socket server', error);
}

ws.onclose = (event) => {
  console.log('Socket connection closed');
  alert('closing socket server');
}


