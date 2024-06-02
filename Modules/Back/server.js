const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
  console.log('Новое подключение!');

  const interval = setInterval(() => {
    ws.send('hi');
  }, 1000);

  ws.on('message', function incoming(message) {
    console.log('Получено сообщение: %s', message);
  });

  ws.on('close', function close() {
    console.log('Подключение закрыто');
    clearInterval(interval); 
  });
});

const server = require('http').createServer();
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(8080, () => {
  console.log('WebSocket сервер запущен на порту 8080');
});

wss.on('headers', function headers(headers, request) {
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
});
