import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
import "./ChatApp.css";
import Channels from "../Channels/Channels";
import Chats from "../Chats/Chats";
import Modal from "../Modal/Modal";
import UserAvatar from "../UserAvatar/UserAvatar";
import ChooseAvatar from "../ChooseAvatar/ChooseAvatar";
import GenerateBgColor from "../GenerateBgColor/GenerateBgColor";
import EditableInput from "../EditableInput/EditableInput";
import Alert from "../Alert/Alert";
import DeleteModal from "../DeleteModal/DeleteModal";

const ChatApp = () => {
  const { authService, chatService, socketService } = useContext(UserContext);
  const history = useHistory();

  const [chatMessages, setChatMessages] = useState([]);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [initState, setInitState] = useState({
    userName: authService.name,
    email: authService.email,
    avatarName: authService.avatarName,
    avatarColor: authService.avatarColor,
  });
  const [userInfo, setUserInfo] = useState(initState);
  const [modal, setModal] = useState(false);
  const [chooseAvatarModal, setChooseAvatarModal] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [selectedChannel, setSelectedChannel] = useState({});

  useEffect(() => {
    socketService.establishConnection();
    return () => socketService.closeConnection();
  }, []);

  useEffect(() => {
    socketService.getChatMessage((newMessage, messages) => {
      if (newMessage.channelId === chatService.selectedChannel.id) {
        setChatMessages(messages);
      }

      if (chatService.unreadChannels.length) {
        setUnreadChannels(chatService.unreadChannels);
      }
    });
  }, []);

  useEffect(() => {
    setUserInfo(initState);
  }, [initState, modal]);

  useEffect(() => {
    setDisabled(JSON.stringify(initState) === JSON.stringify(userInfo));
    updateEmail && setDisabled(true);
  }, [updateEmail, initState, userInfo]);

  // const setChannel = () => {
  //   setSelectedChannel(chatService.getSelectedChannel());
  //   console.log("chats from ChatApp", chatService.messages);
  // };

  const openNavModal = () => {
    setUpdateUser(false);
    setUpdateEmail(false);
    setModal(true);
  };

  const chooseAvatar = (avatarName) => {
    setUserInfo({ ...userInfo, avatarName });
    setChooseAvatarModal(false);
  };

  const generateBgColor = useCallback(() => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setUserInfo({ ...userInfo, avatarColor: `#${randomColor}` });
  }, [userInfo]);

  useEffect(() => {
    //for update confirmation message
    setOk(false);
  }, [modal, chooseAvatarModal, updateUser, updateEmail, generateBgColor]);

  const onChange = ({ target: { name, value } }) => {
    setError(false);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const validateEmail = () => {
    setError(false);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (email !== initState.email) {
        setUpdating(true);
        authService
          .findUserByEmail2(email)
          .then((res) => {
            if (!!res) {
              setErrMsg("Email already used.");
              setError(true);
            } else {
              setUpdateEmail(false);
            }
          })
          .catch((error) => {
            console.error("error in finding user by email", error);
            setErrMsg("Error finding user by email");
            setError(true);
          });
        setUpdating(false);
      } else {
        setUpdateEmail(false);
      }
    } else {
      setErrMsg("Invalid email format.");
      setError(true);
    }
  };

  const cancelUserUpdate = () => {
    setUpdateUser(false);
    setUserInfo({ ...userInfo, userName: initState.userName });
  };

  const cancelEmailUpdate = () => {
    setError(false);
    setUpdateEmail(false);
    setUserInfo({ ...userInfo, email: initState.email });
  };

  // const cancelUpdate = (inputModal, name, value) => {
  //   inputModal(false);
  //   setUserInfo({ ...userInfo, [name]: value });
  // };

  const updateUserInfo = () => {
    setError(false);
    setUpdating(true);
    authService
      .updateUser(userName, email, avatarName, avatarColor)
      .then(() => {
        setInitState(userInfo);
      })
      .catch((error) => {
        console.error("error updating user", error);
        setErrMsg("Error updating user account.");
        setError(true);
      });
    setUpdating(false);
    setOk(true);
  };

  const logoutUser = () => {
    authService.logoutUser();
    setModal(false);
    history.push("/login");
  };

  const deleteUser = () => {
    setDeleteModal(false);
    setUpdating(true);
    authService.deleteUser().catch((error) => {
      console.error("error deleting user", error);
      setErrMsg("Error deleting user account");
      setError(true);
    });
    setUpdating(false);
    history.push("/userremoved");
  };

  const { userName, email, avatarName, avatarColor } = userInfo;
  const okMsg = "User info updated";

  return (
    <div className="chat-app">
      <nav>
        <h1>Smack Chat</h1>
        <div className="user-avatar" onClick={openNavModal} role="presentation">
          <UserAvatar
            avatar={{
              avatarName: initState.avatarName,
              avatarColor: initState.avatarColor,
            }}
            className="nav-avatar"
            size="sm"
          />
          <div>{initState.userName}</div>
        </div>
      </nav>
      <div className="smack-app">
        <Channels unread={unreadChannels} />
        <Chats chats={chatMessages} />
      </div>
      <Modal title="Profile" isOpen={modal} close={() => setModal(false)}>
        <div className="profile">
          <div
            className="user-avatar-container"
            onClick={() => setChooseAvatarModal(true)}
          >
            <UserAvatar
              avatar={{
                avatarName: avatarName,
                avatarColor: avatarColor,
              }}
              size="md"
              className="profile-avatar"
            />
          </div>
          <GenerateBgColor generateBgColor={generateBgColor} />
          {updateUser ? (
            <EditableInput
              type="text"
              name="userName"
              onChange={onChange}
              value={userName}
              check={() => setUpdateUser(false)}
              xmark={cancelUserUpdate}
            />
          ) : (
            <h4 onClick={() => setUpdateUser(true)}>Username: {userName}</h4>
          )}
          {updateEmail ? (
            <EditableInput
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              check={validateEmail}
              xmark={cancelEmailUpdate}
            />
          ) : (
            <h4 onClick={() => setUpdateEmail(true)}>Email: {email}</h4>
          )}
        </div>
        <div className="profile-btn-container">
          <button
            onClick={updateUserInfo}
            className={`submit-btn update-btn ${disabled &&
              "update-btn-disabled"}`}
            disabled={disabled}
          >
            Update User Info
          </button>
          <button onClick={logoutUser} className="submit-btn logout-btn">
            logout
          </button>
          <button
            onClick={() => setDeleteModal(true)}
            className="submit-btn delete-btn"
          >
            delete account
          </button>
        </div>
        {updating ? <div>"Processing..."</div> : null}
        {error ? (
          <Alert
            message={errMsg}
            type="alert-danger"
            close={() => setError(false)}
          />
        ) : null}
        {ok ? <Alert message={okMsg} type="alert-ok" /> : null}
        <ChooseAvatar
          isOpen={chooseAvatarModal}
          close={() => setChooseAvatarModal(false)}
          chooseAvatar={chooseAvatar}
        />
      </Modal>
      <DeleteModal
        title="Delete user"
        isOpen={deleteModal}
        close={() => setDeleteModal(false)}
        msg="Are you sure you want to delete your account?"
        deleteFunc={deleteUser}
      />
    </div>
  );
};

export default ChatApp;
