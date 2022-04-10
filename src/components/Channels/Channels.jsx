import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import "./Channels.css";
import Modal from "../Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { toCamelCase } from "../../helpers/camelCase";

const Channels = ({ unread }) => {
  const INIT = {
    name: "",
    description: "",
  };
  const {
    authService,
    chatService,
    socketService,
    appSetChannel,
    appSelectedChannel,
  } = useContext(UserContext);
  const [newChannel, setNewChannel] = useState(INIT);
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [addedNewChannel, setAddedNewChannel] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    setUnreadChannels(unread);
  }, [unread]);

  useEffect(() => {
    chatService.findAllChannels().then((res) => {
      if (!!res.length) {
        setChannels(res);
        appSetChannel(res[0]);
      }
    });
  }, []);

  useEffect(() => {
    socketService.getChannel((channelList, channel) => {
      setChannels([...channelList]);
      if (channelList.length === 1) {
        appSetChannel(channel);
      }
    });
  }, []);

  useEffect(() => {
    if (addedNewChannel) {
      appSetChannel(channels[channels.length - 1]);
      const unread = chatService.setUnreadChannels(
        channels[channels.length - 1]
      );
      setUnreadChannels(unread);
      setAddedNewChannel(false);
    }
  }, [channels]);

  const selectChannel = (channel) => () => {
    appSetChannel(channel);
    const unread = chatService.setUnreadChannels(channel);
    setUnreadChannels(unread);
  };

  const onChange = ({ target: { name, value } }) => {
    setNewChannel({ ...newChannel, [name]: value });
  };

  const createChannel = (e) => {
    e.preventDefault();
    const camelChannel = toCamelCase(newChannel.name);
    socketService.addChannel(camelChannel, newChannel.description);
    setAddedNewChannel(true);
    setNewChannel(INIT);
    setModal(false);
  };

  const openDeleteConf = (id, name) => {
    setChannelToDelete({ id, name });
    setDeleteModal(true);
  };

  const closeDeleteConf = () => {
    setChannelToDelete({ id: "", name: "" });
    setDeleteModal(false);
  };

  const deleteChannel = () => {
    chatService
      .deleteChannel(channelToDelete.id) //delete from db
      .then(() => {
        setChannels(chatService.removeChannel(channelToDelete.id)); //remove from chatService
        appSetChannel(chatService.getSelectedChannel());
        setUnreadChannels(chatService.unreadChannels);
      })
      .catch((error) => {
        console.error("error deleting channel", error);
      });
    setChannelToDelete({ id: "", name: "" });
    setDeleteModal(false);
  };

  return (
    <>
      <div className="channel">
        <div className="channel-header">
          <h3 className="channel-label">{authService.name}</h3>
        </div>
        <h3 className="channel-label">
          Channels <span onClick={() => setModal(true)}>Add +</span>
        </h3>
        <div className="channel-list">
          {!!channels.length ? (
            channels.map((channel) => (
              <div
                key={channel.id}
                onClick={selectChannel(channel)}
                className={`channel-label ${
                  unreadChannels.includes(channel.id) ? "unread" : ""
                }`}
              >
                <div
                  className={`inner ${
                    appSelectedChannel.id === channel.id ? "selected" : ""
                  }`}
                >
                  # {channel.name}
                  <i
                    onClick={() => openDeleteConf(channel.id, channel.name)}
                    className="fa-solid fa-circle-trash"
                  ></i>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "white" }}>No channels.</div>
          )}
        </div>
      </div>
      <Modal title="Create Channel" isOpen={modal} close={setModal}>
        <form className="form channel-form" onSubmit={createChannel}>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="enter channel name"
            value={newChannel.name}
            onChange={onChange}
          />
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="enter channel description"
            value={newChannel.description}
            onChange={onChange}
          />
          <input type="submit" className="submit-btn" value="Create Channel" />
        </form>
      </Modal>
      <DeleteModal
        title="Delete channel"
        isOpen={deleteModal}
        close={closeDeleteConf}
        msg={`Are you sure you want to delete ${channelToDelete.name} and all its messages?`}
        deleteFunc={deleteChannel}
      />
    </>
  );
};

export default Channels;
