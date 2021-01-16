import React from 'react';

const Login = (props) => {
  const { setUserName, setRoom, connectToRoom } = props.data;

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      connectToRoom();
    }
  };

  return (
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
          onKeyPress={handleKeypress}
        />
      </div>
      <button type='button' onClick={connectToRoom}>
        Enter Chat
      </button>
    </div>
  );
};

export default Login;
