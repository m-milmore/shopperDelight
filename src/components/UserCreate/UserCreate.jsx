import React, { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { AVATAR_COUNT } from "../../constants";
import Modal from "../Modal/Modal";
import Alert from "../Alert/Alert";
import "./UserCreate.css";
import UserAvatar from "../UserAvatar/UserAvatar";

export const ToggleContext = createContext();

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
  const [isLoading, setIsLoading] = useState(false);
  const [radio, setRadio] = useState("dark");
  const toggle = { radio, setRadio };

  const onChange = ({ target: { name, value } }) =>
    setUserInfo({ ...userInfo, [name]: value });

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
      setIsLoading(true);
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
              console.error("error logging user", error);
              setError(true);
            });
        })
        .catch((error) => {
          console.error("error registering user", error);
          setError(true);
        });
      setIsLoading(false);
    }
  };

  const { userName, email, password, avatarName, avatarColor } = userInfo;
  const errMessage = "Error creating account. Please try again.";

  return (
    <ToggleContext.Provider value={toggle}>
      <div className="center-display">
        {error ? <Alert message={errMessage} type="alert-danger" /> : null}
        {isLoading ? <div>Loading...</div> : null}
        <h3 className="title">Create an account</h3>
        <form onSubmit={createUser} className="form">
          <input
            onChange={onChange}
            value={userName}
            type="text"
            className="form-control"
            name="userName"
            placeholder="enter username"
          />
          <input
            onChange={onChange}
            value={email}
            type="email"
            className="form-control"
            name="email"
            placeholder="enter email"
          />
          <input
            onChange={onChange}
            value={password}
            type="password"
            className="form-control"
            name="password"
            placeholder="enter password"
          />
          <div className="avatar-container">
            <UserAvatar
              avatar={{ avatarName, avatarColor }}
              className="create-avatar"
            />
            <div onClick={() => setModal(true)} className="avatar-text">
              Choose Avatar
            </div>
            <div onClick={generateBgColor} className="avatar-text">
              Generate background color
            </div>
          </div>
          <input type="submit" className="submit-btn" value="Create Account" />
        </form>
        <div className="footer-text">
          Already registered? Login <Link to="/login">HERE</Link>
        </div>
      </div>
      <Modal title="Choose Avatar" isOpen={modal} close={() => setModal(false)}>
        <>
          <div className="modal-toggle">
            <button
              onClick={() => setRadio("dark")}
              className={`toggle-btn dark-btn ${radio === "dark" &&
                "selected"}`}
            >
              Dark
            </button>
            <button
              onClick={() => setRadio("light")}
              className={`toggle-btn light-btn ${radio === "light" &&
                "selected"}`}
            >
              Light
            </button>
          </div>
          <div className={`avatar-list ${radio === "light" && "tinted-bg"}`}>
            {/* {AVATARS.map((img) => (
            <div
              role="presentation"
              key={img}
              className="avatar-icon"
              onClick={() => chooseAvatar(img)}
            >
              <img src={img} alt="avatar" />
            </div>
          ))} */}
            {Array.from({ length: AVATAR_COUNT }, (v, i) => (
              <div
                role="presentation"
                key={i}
                className="create-avatar"
                onClick={() => chooseAvatar(`/${radio}${i}.png`)}
              >
                <img src={`/${radio}${i}.png`} alt="avatar" />
              </div>
            ))}
          </div>
        </>
      </Modal>
    </ToggleContext.Provider>
  );
};

export default UserCreate;
