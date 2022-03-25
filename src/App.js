import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import ChatApp from "./components/ChatApp/ChatApp";
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from "./components/UserCreate/UserCreate";
import { AuthService, ChatService, SocketService } from "./services";

const authService = new AuthService();
const chatService = new ChatService(authService.getBearerHeader);
const socketService = new SocketService(chatService);

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    chatService,
    socketService,
    appSelectedChannel: {},
    appSetChannel: (ch) => {
      setAuthContext({ ...authContext, appSelectedChannel: ch });
      chatService.setSelectedChannel(ch);
    },
  };

  const [authContext, setAuthContext] = useState(context);

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

const PrivateRoute = ({ children, ...props }) => {
  const context = useContext(UserContext);
  return (
    <Route
      {...props}
      render={({ location }) =>
        context.authService.isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" exact component={UserLogin} />
          <Route path="/register" exact component={UserCreate} />
          <PrivateRoute>
            <ChatApp />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
