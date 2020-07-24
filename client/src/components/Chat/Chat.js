import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Particles from "react-tsparticles";
import particleOptions from "../Login/Particles"

import UsersContainer from '../Users/Users';
import Messages from '../MessageBox/Messages';
import Bar from '../MessageBox/Bar/Bar';
import Input from '../MessageBox/Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://connect-io.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
  <div>
    <div className="outerContainer">
      <div className="container">
          <Bar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <UsersContainer users={users}/>
      </div>
      <Particles className="particles" params={particleOptions} />
  </div>
  );
}

export default Chat;
