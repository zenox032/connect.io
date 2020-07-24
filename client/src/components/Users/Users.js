import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';

import './Users.css';

const UsersContainer = ({ users }) => (
  <div className="textContainer">
    { users ? (
          <div>
            <h3>In room:</h3>
            <div className="activeContainer">
              <p>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </p>
            </div>
          </div>
        )
        : null }
  </div>
);

export default UsersContainer;