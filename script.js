
let ws = new WebSocket('wss://new-socket-server.herokuapp.com:443');



ws.onopen = event => {
  console.log('Socket connection open');
  // alert('Successfully connected to socket server 🎉');
  ws.send('pong');
}

ws.onmessage = (message) => {
  if(message && message.data) {
    if(message.data === 'ping') {
      console.log('got ping')
      ws.send('pong');  
      return
    }
    let data = JSON.parse(message.data);
    if(data) {
      console.log('got data', data);
    }
  }
  
  console.log('message', message)
}

ws.onerror = (error) => {
  console.log('Error in the connection', error);
  alert('error connecting socket server', error);
}

ws.onclose = (event) => {
  console.log('Socket connection closed');
  alert('closing socket server');
}


let button = document.querySelector('.myButton')
button.addEventListener('click', () => {
  console.log('sent')
  let x = {'button1': 1};
  ws.send(JSON.stringify(x))
})