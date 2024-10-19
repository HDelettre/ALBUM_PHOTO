import React from "react";

const InfoBar = ({ message, userData, setMenu }) => {

  const editProfileHandle = () => {
    setMenu("editProfile")
  }
  
  return (
    <div className="infoBar">
      <div className="infoBar_message">{message}</div>
      <div className="infoBar_user">
        {userData ? (
          <>
            {`${userData.firstName} ${userData.lastName}`}
            <div className="userAvatar">
              <img
                src={`${process.env.REACT_APP_PICTURES}/users/${userData.avatar}`}
                alt={userData.lastName}
                title="Modifier le profil"
                onClick={editProfileHandle}
              />
            </div>
          </>
        ) : (
          "Connectez-vous !"
        )}
      </div>
    </div>
  );
};

export default InfoBar;
