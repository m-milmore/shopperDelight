import axios from "axios";
import io from "socket.io-client";

const BASE_URL = "http://localhost:3005/v1";
const URL_ACCOUNT = `${BASE_URL}/account`;
const URL_LOGIN = `${URL_ACCOUNT}/login`;
const URL_REGISTER = `${URL_ACCOUNT}/register`;

const URL_USER = `${BASE_URL}/user`;
const URL_USER_BY_EMAIL = `${URL_USER}/byEmail/`;
const URL_USER_ADD = `${URL_USER}/add`;

const URL_GET_CHANNELS = `${BASE_URL}/channel`;
const URL_CHANNEL = `${BASE_URL}/channel`;

const URL_MESSAGE = `${BASE_URL}/message`;
const URL_GET_MESSAGES = `${BASE_URL}/message/byChannel/`;

const headers = { "Content-Type": "application/json" };

class User {
  constructor() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.avatarName = "avatarDefault.png";
    this.avatarColor = "";
    this.isLoggedIn = false;
    this.accountId = "";
  }

  setUserEmail(email) {
    this.email = email;
  }

  setUserAccountId(id) {
    this.accountId = id;
  }

  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setUserData(userData) {
    const { _id, name, email, avatarName, avatarColor } = userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.avatarName = avatarName;
    this.avatarColor = avatarColor;
  }
}

export class AuthService extends User {
  constructor(chatService = new ChatService()) {
    super();
    this.authToken = "";
    this.bearerHeader = {};
    this.chatService = chatService;
  }

  logoutUser() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.avatarName = "";
    this.avatarColor = "";
    this.isLoggedIn = false;
    this.authToken = "";
    this.bearerHeader = {};
    this.accountId = "";
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };
  }

  getBearerHeader = () => this.bearerHeader;

  async registerUser(email, password) {
    const body = {
      email: email.toLowerCase(),
      password: password,
    };

    try {
      await axios.post(URL_REGISTER, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(name, email, avatarName, avatarColor) {
    const headers = this.getBearerHeader();
    const body = {
      name: name,
      email: email,
      avatarName: avatarName,
      avatarColor: avatarColor,
    };

    try {
      const response = await axios.post(URL_USER_ADD, body, { headers });
      this.setUserData(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async loginUser(email, password) {
    const body = {
      email: email.toLowerCase(),
      password: password,
    };

    try {
      const response = await axios.post(URL_LOGIN, body, { headers });
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setUserEmail(response.data.user);
      this.setUserAccountId(response.data.id);
      this.setIsLoggedIn(true);
      await this.findUserByEmail();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUserByEmail() {
    const headers = this.getBearerHeader();

    try {
      const response = await axios.get(URL_USER_BY_EMAIL + this.email, {
        headers,
      });
      !!response.data && this.setUserData(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUserByEmail2(email) {
    const headers = this.getBearerHeader();

    try {
      const response = await axios.get(URL_USER_BY_EMAIL + email, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(name, email, avatarName, avatarColor) {
    const headers = this.getBearerHeader();
    const body = {
      name: name,
      email: email,
      avatarName: avatarName,
      avatarColor: avatarColor,
    };

    try {
      if (email !== this.email) {
        // if the user is updating his email then we change it also in the accounts table
        this.updateAccount(email);
      }
      await axios.put(URL_USER + "/" + this.id, body, { headers });
      body._id = this.id;
      this.setUserData(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateAccount(email) {
    const body = {
      username: email,
    };

    try {
      await axios.patch(URL_ACCOUNT + "/" + this.accountId, body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser() {
    const headers = this.getBearerHeader();
    let messages = [];

    try {
      this.getAllMessages().then((res) => {
        messages = [...res];
        if (!!messages.length) {
          for (const message of messages) {
            if (message.userId === this.id) {
              this.chatService.deleteMessage(message._id, headers);
            }
          }
        }
      });
      await axios.delete(URL_USER + "/" + this.id, { headers });
      await axios.delete(URL_ACCOUNT + "/" + this.accountId);
    } catch (error) {
      console.error(error);
      throw error;
    }
    this.logoutUser();
  }

  async getAllMessages() {
    const headers = this.getBearerHeader();

    try {
      const response = await axios.get(URL_MESSAGE, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export class ChatService {
  constructor(authHeader) {
    this.getAuthHeader = authHeader;
    this.selectedChannel = {};
    this.channels = [];
    this.unreadChannels = [];
    this.messages = [];
  }

  addChannel = (channel) => this.channels.push(channel);
  addMessage = (chat) => this.messages.push(chat);
  setSelectedChannel = (channel) => (this.selectedChannel = channel);
  getSelectedChannel = () => this.selectedChannel;
  getAllChannels = () => this.channels;
  getAllMessages = () => this.messages;

  addToUnread = (urc) => this.unreadChannels.push(urc);

  setUnreadChannels = (channel) => {
    if (this.unreadChannels.includes(channel.id)) {
      this.unreadChannels = this.unreadChannels.filter(
        (ch) => ch !== channel.id
      );
    }
    return this.unreadChannels;
  };

  removeChannel = (id) => {
    this.channels = this.channels.filter((channel) => channel.id !== id);
    if (!!this.channels.length) {
      this.setSelectedChannel(this.channels[0]);
      this.findAllMessagesForChannel(this.channels[0].id);
      this.setUnreadChannels(this.channels[0].id);
    } else {
      this.setSelectedChannel({});
      this.messages = [];
      this.unreadChannels = [];
    }
    return this.channels;
  };

  async findAllChannels() {
    const headers = this.getAuthHeader();

    try {
      let response = await axios.get(URL_GET_CHANNELS, { headers });
      if (!!response) {
        response = response.data.map((channel) => ({
          name: channel.name,
          description: channel.description,
          id: channel._id,
        }));
        this.channels = [...response];
        return response;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllMessagesForChannel(channelId) {
    const headers = this.getAuthHeader();
    try {
      let response = await axios.get(URL_GET_MESSAGES + channelId, {
        headers,
      });
      response = response.data.map((msg) => ({
        id: msg._id,
        userId: msg.userId,
        channelId: msg.channelId,
        userAvatar: msg.userAvatar,
        userAvatarColor: msg.userAvatarColor,
        userName: msg.userName,
        timeStamp: msg.timeStamp,
        messageBody: msg.messageBody,
      }));
      this.messages = response;
      return response;
    } catch (error) {
      console.error(error);
      this.messages = [];
      throw error;
    }
  }

  async updateMessage(
    id,
    messageBody,
    userId,
    channelId,
    userName,
    userAvatar,
    userAvatarColor
  ) {
    const headers = this.getAuthHeader();
    const body = {
      messageBody,
      userId,
      channelId,
      userName,
      userAvatar,
      userAvatarColor,
    };

    try {
      await axios.put(URL_MESSAGE + "/" + id, body, { headers });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMessage(id, headers = this.getAuthHeader()) {
    try {
      await axios.delete(URL_MESSAGE + "/" + id, { headers });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteChannel(id) {
    const headers = this.getAuthHeader();
    let messages = [];

    try {
      this.findAllMessagesForChannel(id).then((res) => {
        messages = [...res];
        if (!!messages.length) {
          for (const message of messages) {
            this.deleteMessage(message.id);
          }
        }
      });
      await axios.delete(URL_CHANNEL + "/" + id, { headers });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export class SocketService {
  socket = io("http://localhost:3005/");
  constructor(chatService) {
    this.chatService = chatService;
  }

  establishConnection() {
    console.log("client connected");
    this.socket.connect();
  }

  closeConnection() {
    console.log("client disconnected");
    this.socket.disconnect();
  }

  addChannel(name, description) {
    // sends a message to the API that a new channel should be created on the db
    this.socket.emit("newChannel", name, description);
  }

  getChannel(cb) {
    // listen from the API if a new channel has been created then propagate an updated channel list to all active users
    this.socket.on("channelCreated", (name, description, id) => {
      const channel = { name, description, id };
      this.chatService.addChannel(channel);
      const channelList = this.chatService.getAllChannels();
      cb(channelList, channel);
    });
  }

  addMessage(messageBody, channelId, user) {
    const { userId, userName, userAvatar, userAvatarColor } = user;
    if (!!messageBody && !!channelId && !!user) {
      this.socket.emit(
        "newMessage",
        messageBody,
        userId,
        channelId,
        userName,
        userAvatar,
        userAvatarColor
      );
    }
  }

  getChatMessage(cb) {
    this.socket.on(
      "messageCreated",
      (
        messageBody,
        userId,
        channelId,
        userName,
        userAvatar,
        userAvatarColor,
        id,
        timeStamp
      ) => {
        const channel = this.chatService.getSelectedChannel();
        const chat = {
          messageBody,
          userId,
          channelId,
          userName,
          userAvatar,
          userAvatarColor,
          id,
          timeStamp,
        };
        if (
          //that's for the other users, not the user who created the message
          channelId !== channel.id && // the message doesn't belong to the displayed channel
          !this.chatService.unreadChannels.includes(channelId) // the channel of the message isn't already included in the list of unread channel
        ) {
          this.chatService.addToUnread(channelId);
        }
        this.chatService.messages = [...this.chatService.messages, chat];
        cb(chat, this.chatService.messages);
      }
    );
  }

  startTyping(userName, channelId) {
    this.socket.emit("startType", userName, channelId);
  }

  stopTyping(userName) {
    this.socket.emit("stopType", userName);
  }

  getUserTyping(cb) {
    this.socket.on("userTypingUpdate", (typingUsers) => {
      cb(typingUsers);
    });
  }
}
