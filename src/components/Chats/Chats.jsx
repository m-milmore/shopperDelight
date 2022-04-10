import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import "./Chats.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import DeleteModal from "../DeleteModal/DeleteModal";
import { formatDate } from "../../helpers/dateFormat";

const Chats = ({ chats }) => {
  const {
    authService,
    appSelectedChannel,
    chatService,
    socketService,
  } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [editingMsg, setEditingMsg] = useState("");
  const [pencilClick, setPencilClick] = useState(false);

  useEffect(() => {
    setMessages(chats);
  }, [chats]);

  useEffect(() => {
    if (!!appSelectedChannel.id) {
      chatService
        .findAllMessagesForChannel(appSelectedChannel.id)
        .then((res) => setMessages(res));
    } else {
      setMessages([]);
    }
    setMessageId("");
  }, [appSelectedChannel]);

  useEffect(() => {
    socketService.getUserTyping((users) => {
      let names = "";
      let usersTyping = 0;
      for (const [typingUser, chId] of Object.entries(users)) {
        if (typingUser !== authService.name && appSelectedChannel.id === chId) {
          names = names === "" ? typingUser : `${names}, ${typingUser}`;
          usersTyping += 1;
        }
      }
      if (usersTyping > 0) {
        const verb = usersTyping > 1 ? "are" : "is";
        setTypingMessage(`${names} ${verb} typing a message...`);
      } else {
        setTypingMessage("");
      }
    });
  }, [appSelectedChannel]);

  const onTyping = ({ target: { value } }) => {
    if (!value.length) {
      setIsTyping(false);
      socketService.stopTyping(authService.name);
    } else if (!isTyping) {
      socketService.startTyping(authService.name, appSelectedChannel.id);
    } else {
      setIsTyping(true);
    }
    setMessageBody(value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const { name, id, avatarName, avatarColor } = authService;
    const user = {
      userId: id,
      userName: name,
      userAvatar: avatarName,
      userAvatarColor: avatarColor,
    };
    socketService.addMessage(messageBody, appSelectedChannel.id, user);
    socketService.stopTyping(authService.name);
    setMessageBody("");
  };

  const editMessage = (msgId, msgBody) => {
    setMessageId(msgId);
    setEditingMsg(msgBody);
    setPencilClick(true);
  };

  const updateMessage = () => {
    chatService
      .updateMessage(
        messageId,
        editingMsg,
        authService.id,
        appSelectedChannel.id,
        authService.name,
        authService.avatarName,
        authService.avatarColor
      )
      .catch((error) => {
        console.error("error updating message", error);
      });
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, messageBody: editingMsg } : msg
      )
    );
    setMessageId("");
    setEditingMsg("");
    setPencilClick(false);
  };

  const cancelEditMessage = () => {
    setMessageId("");
    setEditingMsg("");
    setPencilClick(false);
  };

  const openDeleteConf = (msgId, msgBody) => {
    setMessageId(msgId);
    setEditingMsg(msgBody);
    setDeleteModal(true);
  };

  const closeDeleteConf = () => {
    setMessageId("");
    setEditingMsg("");
    setDeleteModal(false);
  };

  const deleteMessage = () => {
    chatService.deleteMessage(messageId).catch((error) => {
      console.error("error deleting message", error);
    });
    setMessages((messages) => messages.filter((msg) => msg.id !== messageId));
    setMessageId("");
    setEditingMsg("");
    setDeleteModal(false);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        {!!appSelectedChannel && (
          <>
            <h3>#{appSelectedChannel.name} -&nbsp;</h3>
            <h4>{appSelectedChannel.description}</h4>
          </>
        )}
      </div>
      <div className="chat-list">
        {!!messages.length ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${authService.id === msg.userId &&
                "by-user"}`}
            >
              <UserAvatar
                avatar={{
                  avatarName: msg.userAvatar,
                  avatarColor: msg.userAvatarColor,
                }}
                size="md"
              />
              <div className="chat-user">
                <strong>{msg.userName}</strong>
                <small>{formatDate(msg.timeStamp)}</small>
                {msg.id === messageId ? (
                  <textarea
                    rows="1"
                    cols="75"
                    className="message-edit"
                    defaultValue={editingMsg}
                    onChange={(e) => setEditingMsg(e.target.value)}
                  />
                ) : (
                  <div className="message-body">{msg.messageBody}</div>
                )}
              </div>
              {authService.id === msg.userId && (
                <div className="icons-container">
                  {pencilClick ? (
                    <>
                      <i
                        onClick={updateMessage}
                        className="fa-solid fa-message-pen"
                      ></i>
                      <i
                        onClick={cancelEditMessage}
                        className="fa-solid fa-message-slash"
                      ></i>
                    </>
                  ) : (
                    <>
                      <i
                        onClick={() => openDeleteConf(msg.id, msg.messageBody)}
                        className="fa-solid fa-trash-can"
                      ></i>
                      <i
                        onClick={() => editMessage(msg.id, msg.messageBody)}
                        className="fa-solid fa-pencil"
                      ></i>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No messages...</div>
        )}
      </div>
      <form onSubmit={sendMessage} className="chat-bar">
        <div className="typing">{typingMessage}</div>
        <div className="chat-wrapper">
          <textarea
            value={messageBody}
            placeholder="type a message..."
            onChange={onTyping}
          />
          <input type="submit" value="Send" className="submit-btn" />
        </div>
      </form>
      <DeleteModal
        title="Delete message"
        isOpen={deleteModal}
        close={closeDeleteConf}
        msg="Are you sure you want to delete your message?"
        deleteFunc={deleteMessage}
      />
    </div>
  );
};

export default Chats;
