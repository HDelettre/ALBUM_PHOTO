import React from 'react';

const InfoBar = ({message, userData}) => {
  return (
    <div className='infoBar'>
      <div className='infoBar_message'>{message}</div>
      <div className='infoBar_user'>
        {userData ? `${userData.firstName} ${userData.lastName}` : "Connectez-vous !"}
      </div>
    </div>
  );
}

export default InfoBar;
