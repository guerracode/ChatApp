import React from 'react';

const Chat = (props) => {
  const {
    messageList,
    userName,
    setMessage,
    message,
    sendMessage,
  } = props.data;

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='chatContainer'>
      <div className='messages'>
        {messageList.map((val, index) => (
          <div
            className={`messageIndividual ${
              val.author === userName ? 'You' : 'Other'
            }`}
            key={index}
          >
            {val.author !== userName && <h3>{val.author}</h3>}
            <p>{val.message}</p>
          </div>
        ))}
      </div>
      <div className='messageInputs'>
        <input
          type='text'
          placeholder='Message...'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={handleKeypress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
