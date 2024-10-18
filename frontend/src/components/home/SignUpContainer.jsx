import React, { useState } from "react";
import { checkingUserData } from "../../utils/checkingUserData";
import { createUser } from "../../utils/fetchUser";

const SignUpContainer = ({ setMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(
    `${process.env.REACT_APP_PICTURES}/users/defaultAvatar.png`
  );
  const [avatarFile, setAvatarFile] = useState();
  const [avatarChange, setAvatarChange] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeHandle = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
    if (e.target.id === "firstName") {
      if (e.target.value.includes("-")) {
        const tiretLocation = e.target.value.search(/-/);
        setFirstName(
          e.target.value.charAt(0).toUpperCase() +
            e.target.value.slice(1, tiretLocation + 1) +
            e.target.value.charAt(tiretLocation + 1).toUpperCase() +
            e.target.value.slice(tiretLocation + 2)
        );
      } else {
        setFirstName(
          e.target.value.charAt(0).toUpperCase() +
            e.target.value.slice(1).toLowerCase()
        );
      }
    }
    if (e.target.id === "lastName") {
      setLastName(e.target.value.toUpperCase());
    }
  };

  const addFileHandle = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setAvatarFile(e.target.files[0]);
    setAvatarChange(true);
  };

  const deleteFileHandle = () => {
    setAvatar(`${process.env.REACT_APP_PICTURES}/users/defaultAvatar.png`);
    setAvatarFile();
    setAvatarChange(false);
  };

  const passwordHandle = () => {
    if (passwordVisible === true) {
      setPasswordVisible(false)
    } else {
      setPasswordVisible(true)
    }
  }

  const validHandle = () => {
    const bodyRequest = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
    };

    const checkUserData = checkingUserData(bodyRequest);
    if (checkUserData !== "valid") {
      setMessage(checkUserData);
    } else {
      (async () => {
      const bodyForm = new FormData();
      bodyForm.append("email", email)
      bodyForm.append("password", password)
      bodyForm.append("firstName", firstName)
      bodyForm.append("lastName", lastName)
      bodyForm.append("avatar", avatar)
      bodyForm.append("avatarUser", avatarFile)
        console.log("FORMDATA : ", bodyForm.get("key"))
        const fectchCreateUser = await createUser(bodyForm);

        console.log("FETCH CREATE USER : ", fectchCreateUser)
      })();
      
    }
  };

  return (
    <div className="signupContainer">
      <h2>CREER UN COMPTE</h2>
      <form type="onSubmit">
        <div className="fullLine">
          <div className="middleLine">Email :</div>
          <input
            type="email"
            name="email"
            id="email"
            className="middleLine"
            onChange={changeHandle}
            value={email}
            required
            placeholder="xxxxxx.yyyyy@mail.com"
            autoComplete="off"
          />
        </div>
        <div className="fullLine">
          <div className="middleLine">
            Mot de passe :
            <span
              className="fa-solid fa-info-circle icon info"
              title="8 caractères minimum, au moins une minuscule, une majuscule, un nombre et un caractère spécial"
            />
            {passwordVisible === true ? (
              <span className="fa-solid fa-eye icon" onClick={passwordHandle} />
            ) : (
              <span
                className="fa-solid fa-eye-slash icon"
                onClick={passwordHandle}
              />
            )}
          </div>
          <input
            type={passwordVisible === true ? "password" : "text"}
            name="password"
            id="password"
            className="middleLine"
            onChange={changeHandle}
            value={password}
            required
            autoComplete="off"
          />
        </div>
        <div className="fullLine">
          <div className="middleLine">Prénom :</div>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="middleLine"
            onChange={changeHandle}
            value={firstName}
            required
            autoComplete="off"
          />
        </div>
        <div className="fullLine">
          <div className="middleLine">NOM :</div>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="middleLine"
            onChange={changeHandle}
            value={lastName}
            required
            autoComplete="off"
          />
        </div>
        <div className="avatarBox">
          <div className="avatarBox_image">
            <img src={avatar} alt="avatar de l'utilisateur" />
          </div>
          <div className="avatarBox_commande">
            <div className="fileButton">
              <span
                className="fa-solid fa-camera bigIcon"
                title="Sélectionner le fichier"
              />
              <input
                type="file"
                name="modelPicture"
                title="modelPicture"
                id="modelPicture"
                accept=".jpg, .jpeg, .png"
                onChange={addFileHandle}
              />
            </div>
            <span
              className="fa-regular fa-trash-can bigIcon_red"
              title="Supprimer le fichier"
              onClick={deleteFileHandle}
            />
            <span className="button" onClick={validHandle}>
              CREER LE
              <br />
              COMPTE
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpContainer;
