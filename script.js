function setupWebSocket(socketURL) {
  let ws = new WebSocket(socketURL);

  ws.onopen = event => {
    console.log('Socket connection open');
    // alert('Successfully connected to socket server 🎉');
    ws.send('pong');
  }

  ws.onmessage = (message) => {
    if(message === 'ping') {
      ws.send('pong');
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
  return ws;
  
}