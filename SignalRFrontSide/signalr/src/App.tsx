import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Chat from './chat';

function App() {
  const [offers, setOffers] = useState<any[]>([]);
  const [valueCount, setValueCount] = useState<any[]>([]);
  const [hubConnection, setHubConnection] = useState<any | null>(null);

  useEffect(() => {
    // Create the SignalR connection
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7049/value')
      .configureLogging(LogLevel.Information)
      .build();

    // Set the connection in state
    setHubConnection(connection);

    // Start the connection
    connection
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch((err) => console.log('Error while connecting to the server', err));

    // Define the "SendOffersToUser" event handler
    connection.on('SendOffersToUser', (result: any) => {
      setOffers((prevOffers) => [...prevOffers, result]);
    });

       // Define the "ReceiveMessage" event handler
    connection.on('ReceiveMessage', (message: any) => {
      setValueCount((prevOffers) => [...prevOffers, message]);
      console.log(`Received message: ${message}`);
    });

    // Clean up the connection when the component unmounts
    return () => {
      if (connection.state === 'Connected') {
        connection.stop();
      }
    };
  }, []); // Run this effect only once on component mount

  
  return (

    <div className="App">
       <Chat />
       <hr></hr>
      <h2>Data loaded from the Web API:</h2>
      {offers.length > 0 && (
        <div className="alert alert-warning" role="alert">
          <ul>
            {offers.map((item, index) => (
              <li key={index}>Offers: {item}</li>
            ))}
          </ul>
        </div>
      )}
      <h1 style={{display: "block"}}>the count of gtetting info : {valueCount}</h1>
      <hr></hr>
     
    </div>
  );
}

export default App;
