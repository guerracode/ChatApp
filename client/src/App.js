import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

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
        <div className='logIn'>
          <div className='logIn-inputs'>
            <input
              type='text'
              placeholder='Name'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type='text'
              placeholder='Room'
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button type='button' onClick={connectToRoom}>
            Enter Chat
          </button>
        </div>
      ) : (
        <div className='chatContainer'>
          <div className='messages'>
            {messageList.map((val) => (
              <div
                className={`messageIndividual ${
                  val.author === userName ? 'You' : 'Other'
                }`}
              >
                <h3>{val.author === userName ? 'You' : val.author}</h3>
                <p>{val.message}</p>
              </div>
            ))}
          </div>
          <div className='messageInputs'>
            <input
              type='text'
              placeholder='Message...'
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
