
let ws = new WebSocket('wss://our-socket-server.herokuapp.com/:443');

let controllTD = document.querySelector('.controllTD') ;
controllTD.addEventListener('input', (event) => {
  console.log(event.target.value / 100)
  let value = { 'slider1': controllTD.value / 100 }
  ws.send(JSON.stringify(value));
}, false);

let controlledByTD = document.querySelector('.controlledByTD');

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
      if('slider1' in data) {
        controlledByTD.value = data['slider1']*100;
      }
      console.log('got data', data);
    }
  }
  console.log('message', message)
}

ws.onerror = (error) => {
  console.error('Error in the connection', error);
  alert('error connecting socket server', error);
}

ws.onclose = (event) => {
  console.log('Socket connection closed');
  alert('closing socket server');
}