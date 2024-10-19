import React, { useState } from 'react';
import { loginUser } from '../../utils/fetchUser';

const LoginContainer = ({setUserData, setMessage}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState();

  const changeHandle = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const passwordHandle = () => {
    if (passwordVisible === true) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

  const validHandle = () => {
    const bodyRequest = {
      email: email,
      password: password,
    };
    (async () => {
      const fetchLoginUser = await loginUser(bodyRequest);
      if (fetchLoginUser.status === 200) {
        setUserData(fetchLoginUser.data)
      } else {
        setMessage(fetchLoginUser.message)
      }
    })();

    // const checkUserData = checkingUserData(bodyRequest);
    // if (checkUserData !== "valid") {
    //   setMessage(checkUserData);
    // } else {
    //   (async () => {
    //     const bodyForm = new FormData();
    //     bodyForm.append("email", email);
    //     bodyForm.append("password", password);
    //     const fectchCreateUser = await createUser(bodyForm);
    //     setMessage(fectchCreateUser.message);
    //     if (fectchCreateUser.status === 201) {
    //       setMenu("login");
    //     }
    //   })();
    // }
  };

  return (
    <div className="signupContainer">
      <h2>CONNECTEZ-VOUS</h2>
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
          type={passwordVisible === true ? "text" : "password"}
          name="password"
          id="password"
          className="middleLine"
          onChange={changeHandle}
          value={password}
          required
          autoComplete="off"
        />
      </div>


      <span className="button" onClick={validHandle}>
            SE CONNECTER
          </span>
    </div>
  );
}

export default LoginContainer;
