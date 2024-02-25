import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Message.css";

const Message = ({
  id,
  data: { timestamp, displayName, email, message, photo, uid },
}) => {
  const user = useSelector(selectUser);

  return (
    <div className={`message ${user.email === email && "message_sender"}`}>
      <Avatar src={photo} className="message_photo" />
      <div className="message_contents">
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default Message;
