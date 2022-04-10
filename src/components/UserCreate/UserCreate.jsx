import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./UserCreate.css";
import Alert from "../Alert/Alert";
import UserAvatar from "../UserAvatar/UserAvatar";
import ChooseAvatar from "../ChooseAvatar/ChooseAvatar";
import GenerateBgColor from "../GenerateBgColor/GenerateBgColor";

const UserCreate = ({ history }) => {
  const { authService } = useContext(UserContext);
  const INIT_STATE = {
    userName: "",
    email: "",
    password: "",
    avatarName: "avatarDefault.png",
    avatarColor: "none",
  };
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const chooseAvatar = (avatarName) => {
    setUserInfo({ ...userInfo, avatarName });
    setModal(false);
  };

  const generateBgColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setUserInfo({ ...userInfo, avatarColor: `#${randomColor}` });
  };

  const createUser = (e) => {
    e.preventDefault();
    const { userName, email, password, avatarName, avatarColor } = userInfo;
    if (!!userName && !!email && !!password) {
      setLoading(true);
      authService
        .registerUser(email, password)
        .then(() => {
          authService
            .loginUser(email, password)
            .then(() => {
              authService
                .createUser(userName, email, avatarName, avatarColor)
                .then(() => {
                  setUserInfo(INIT_STATE);
                  history.push("/");
                })
                .catch((error) => {
                  console.error("error creating user", error);
                  setError(true);
                });
            })
            .catch((error) => {
              console.error("error login user", error);
              setError(true);
            });
        })
        .catch((error) => {
          console.error("error registering user", error);
          setError(true);
        });
      setLoading(false);
    }
  };

  const { userName, email, password, avatarName, avatarColor } = userInfo;
  const errMsg = "Error creating account. Please try again.";

  return (
    <>
      <div className="center-display">
        {error ? <Alert message={errMsg} type="alert-danger" /> : null}
        {loading ? <div>"Loading..."</div> : null}
        <h3 className="title">Create an account</h3>
        <form onSubmit={createUser} className="form">
          <input
            type="text"
            className="form-control"
            name="userName"
            placeholder="enter a username"
            onChange={onChange}
            value={userName}
          />
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="enter your email"
            onChange={onChange}
            value={email}
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="enter a password"
            onChange={onChange}
            value={password}
          />
          <div className="avatar-container">
            <UserAvatar avatar={{ avatarName, avatarColor }} />
            <div onClick={() => setModal(true)} className="avatar-text">
              Choose avatar
            </div>
            <GenerateBgColor generateBgColor={generateBgColor} />
          </div>
          <input type="submit" className="submit-btn" value="create account" />
        </form>
        <div className="footer-text">
          Already have an account? Log in <Link to="/login">HERE</Link>
        </div>
      </div>
      <ChooseAvatar
        isOpen={modal}
        close={() => setModal(false)}
        chooseAvatar={chooseAvatar}
      />
    </>
  );
};

export default UserCreate;
