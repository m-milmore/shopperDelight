import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Channels from "../Channels/Channels";
import Chats from "../Chats/Chats";
import Modal from "../Modal/Modal";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./ChatApp.css";

const ChatApp = () => {
  const { authService, chatService, socketService } = useContext(UserContext);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [unreadChannels, setUnreadChannels] = useState([]);

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

  const logoutUser = () => {
    authService.logoutUser();
    setModal(false);
    history.push("/login");
  };

  return (
    <div className="chat-app">
      <nav>
        <h1>Smack Chat</h1>
        <div className="user-avatar" onClick={() => setModal(true)}>
          <UserAvatar className="nav-avatar" size="sm" />
          <div>{authService.name}</div>
        </div>
      </nav>
      <div className="smack-app">
        <Channels unread={unreadChannels} />
        <Chats chats={chatMessages} />
      </div>
      <Modal title="Profile" isOpen={modal} close={() => setModal(false)}>
        <div className="profile">
          <UserAvatar />
          <h4>Username: {authService.name}</h4>
          <h4>Email: {authService.email}</h4>
        </div>
        <button onClick={logoutUser} className="submit-btn logout-btn">
          Logout
        </button>
      </Modal>
    </div>
  );
};

export default ChatApp;
