import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

function SignalRReceiver({url, onMessage}) {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!', result);
          connection.on('ReceiveMessage', message => {
            console.log('Received message:', message);
            onMessage(message);
          });
        })
        .catch(e => console.log('Connection failed:', e));
    }
  }, [connection]);
}

export default SignalRReceiver;
