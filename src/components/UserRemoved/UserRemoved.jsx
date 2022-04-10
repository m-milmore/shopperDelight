import React from "react";
import { Link } from "react-router-dom";
import "./UserRemoved.css";

const UserRemoved = () => {

  return (
    <div>
      <div>User Removed Successfully</div>
      <div>
        Click <Link to="/register">HERE</Link> to create an account.
      </div>
    </div>
  );
};

export default UserRemoved;
