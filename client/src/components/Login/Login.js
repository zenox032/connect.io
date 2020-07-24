import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';

import Particles from "react-tsparticles";
import particleOptions from "./Particles"


const SignIn = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="loginContainer">

      <div className="loginInnerContainer">
        <h1 className="title">connect.io</h1>
        <div>
          <input className="loginInput" type="text"  placeholder="Type username"  onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input  className="loginInput spacer" type="text" placeholder="Type room name" onChange={(e) => setRoom(e.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button spacer'} type="submit">connect</button>
        </Link>
      </div>
      <Particles className="particles" params={particleOptions} />
    </div>
  );
}

export default SignIn;
