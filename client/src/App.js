import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';

let socket;
const CONNECTION_PORT = 'localhost:3001';

function App() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');

  // After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit('join_room', room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room,
      content: {
        author: userName,
        message: message,
      },
    };
    await socket.emit('send_message', messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage('');
  };

  return (
    <div className='App'>
      {!loggedIn ? (
        <Login data={{ setUserName, setRoom, connectToRoom }} />
      ) : (
        <Chat
          data={{ messageList, userName, message, setMessage, sendMessage }}
        />
      )}
    </div>
  );
}

export default App;
