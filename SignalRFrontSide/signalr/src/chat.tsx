// Chat.tsx
import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import  axios  from 'axios';

const Chat: React.FC = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [msgText, setMessages] = useState<{ user: string, message: string }[]>([]);
    const [user, setUser] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        console.log("start getting chat ");
        const newConnection = new HubConnectionBuilder()
        // change it base on backend url
            .withUrl("https://localhost:7049/chat")
            .configureLogging(LogLevel.Information)
            .build();

        setConnection(newConnection);

        newConnection.start()
            .then(() => {
                console.log("SignalR Connected");
            })
            .catch((error) => {
                console.log("SignalR Connection Error: " + error);
            });

            
        newConnection.on("ReceiveChatMessage", (user, message) => {
            console.log("msg when connection is on", message)
            setMessages([...msgText, { user, message }]);
        });



        // Clean up the connection when the component unmounts
        return () => {
            if (newConnection.state === 'Connected') {
                newConnection.stop();
            }
        };
    }, []);

    const sendMessage = async () => {
        if (message.trim() === "") return;
        if (user.trim() === "") setUser("Anonymous");
        var postMsg = {
            "user": user,
            "msgText": message
        }
        try {
            console.log('msg', postMsg)
            await axios.post("https://localhost:7049/api/chat/send", postMsg)
            // await connection?.invoke("SendMessage", user, message);
            // setMessage("");
        } catch (error) {
            console.error("SignalR Send Message Error: " + error);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div>
                <ul>
                    {msgText.map((m, index) => (
                        <li key={index}>
                            <strong>{m.user}:</strong> {m.message}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
