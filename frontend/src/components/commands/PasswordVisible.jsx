import React from 'react';

const PasswordVisible = ({setPasswordVisible}) => {

  const passwordHandle = () => {
    if (passwordVisible === true) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

  return (
    <div>
      
    </div>
  );
}

export default PasswordVisible;
