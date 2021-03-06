const net = require('net');
const ws = require('ws');

const { PORT, IP } = require('./constansts/address');

const client = new net.Socket();

const wss = new ws.Server({ port: '8091' });

// WebSocket Connection

wss.on('connection', function connection(ws, req) {

  // TCP Connection

  client.connect({ port: PORT, host: IP }, function() {
    console.log('TCP-connection open');
  });

  client.on('data', function(data) {
    console.log('TCP:: received message: ' + data.toString());
    ws.send(data.toString());
  });

  client.on('close', function () {
    console.log('TCP-connection closed');
  });

  client.on('end', function () {
    console.log('connection ended');
  });
  
  ws.on('message', function incoming(message) {
    console.log('WS:: received message: ', message);

    client.write(message);
  });

  ws.send('ws connected');
});

wss.on('error', function () {
  console.log('WS ERROR');
})

console.log('Client server running');
