import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      placeholder="..."
      value={message}
      onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
      onChange={({ target: { value } }) => setMessage(value)}
      type="text"
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;