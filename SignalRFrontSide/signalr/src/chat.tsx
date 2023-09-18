// Chat.tsx
import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';

const Chat: React.FC = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [msgText, setMessages] = useState<{ user: string, message: string }[]>([]);
    const [userPost, setuserPost] = useState<string>("");
    const [messagePost, setMessagePost] = useState<string>("");

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


        // Clean up the connection when the component unmounts
        return () => {
            console.log('unmount component and cleanup')
            // use it here, because each msg show just once
            newConnection.on('ReceiveChatMessage', (user, message) => {
                // with this syntax i can save all msg and show together
                setMessages((prevMessages) => [...prevMessages, { user: user, message: message }]);
               
            });

            if (newConnection.state === 'Connected') {
                newConnection.stop();
            }
        };
    }, []);

    const sendMessage = async () => {
        if (messagePost.trim() === "") return;
        if (userPost.trim() === "") setuserPost("Anonymous");
        var postMsg = {
            "user": userPost,
            "msgText": messagePost
        }
        try {
            await axios.post("https://localhost:7049/api/chat/send", postMsg)
            // await connection?.invoke("SendMessage", user, message);
            // setMessage("");
        } catch (error) {
            console.error("SignalR Send Message Error: " + error);
        }
        setMessagePost(''); // Clear the input field after sending a message
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="User"
                    value={userPost}
                    onChange={(e) => setuserPost(e.target.value)}
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
                    value={messagePost}
                    onChange={(e) => setMessagePost(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
