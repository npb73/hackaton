import { useState, useEffect } from 'react';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

function SignalRReceiver({url, onMessage}) {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    console.log('Create signalR')
    const newConnection = new HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    console.log('Connection created')
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!', result);
          connection.on('ReceiveMessage', message => {
            onMessage(message);
          });
        })
        .catch(e => console.log('Connection failed:', e));
    }
  }, [connection]);
}

export default SignalRReceiver;
