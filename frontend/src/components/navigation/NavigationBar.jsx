import React, { useState } from 'react';

const NavigationBar = ({setMenu}) => {
  const [iconeClass, setIconClass] = useState("close");
  const openHandle = (e) => {
    setIconClass(e.target.id)
  }
  const menuHandle =(e) => {
    setMenu(e.target.id)
  }
  return (
    <div className={`navigationBar ${iconeClass}`}>
      <h2>MENU</h2>
      {iconeClass === "close" ? (
        <span className='fa-solid fa-circle-down bigIcon' title='Ouvrir' id="open" onClick={openHandle} />
      ):(
        <>
        <span className='fa-solid fa-right-to-bracket bigIcon' title='Se connecter' id="login" onClick={menuHandle} />
        <span className='fa-solid fa-user-plus bigIcon' title='Créer un Compte' id="signup" onClick={menuHandle} />
        <span className='fa-solid fa-images bigIcon' title='Créer un Album' id="createAlbum" onClick={menuHandle} />
        <span className='fa-solid fa-house bigIcon' title='Accueil' id="home" onClick={menuHandle} />
        <span className='fa-solid fa-right-from-bracket bigIcon' title='Se déconnecter' id="logout" />
        <span className='fa-solid fa-circle-up bigIcon' title='Fermer' id="close" onClick={openHandle} />
        </>
      )}
    </div>
  );
}
export default NavigationBar;
