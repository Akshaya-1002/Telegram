// import React, { useEffect, useState } from 'react';
// import "./Thread.css";
// import { Avatar, IconButton } from '@mui/material';
// import { MicNoneOutlined, MoreHoriz, SendRounded, TimerOutlined } from '@mui/icons-material';
// import db from '../firebase';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { useSelector } from 'react-redux';
// import { selectThreadId, selectThreadName } from '../features/threadSlice';
// import { selectUser } from '../features/userSlice';
// import Message from './Message';

import React, { useEffect, useState } from "react";
import "./Thread.css";
import { Avatar, IconButton } from "@mui/material";
import {
  MicNoneOutlined,
  MoreHoriz,
  SendRounded,
  TimerOutlined,
} from "@mui/icons-material";
import db from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useSelector } from "react-redux";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import { selectUser } from "../features/userSlice";
import Message from "./Message";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
// import EmojiPicker from "emoji-picker-react";

const Thread = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  console.log(messages);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("threads")
      .doc(threadId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      })
      .then(() => {
        setInput("");
      });
  };

  console.log(input);

  return (
    <div className="thread">
      <div className="thread_header">
        <div className="thread_header_contents">
          {/* Avatar */}

          {/* <Avatar /> */}
          <Avatar src={messages[0]?.data?.photo} />

          <div className="thread_header_contents_info">
            <h4>{threadName}</h4>
            <h5>Last Seen</h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread_header_details" />
        </IconButton>
      </div>

      {/* Message.js */}

      <div className="thread_messages">
        {messages.map(({ id, data }) => (
          <Message key={id} id={id} data={data} />
        ))}
      </div>

      {/* form */}

      <div className="thread_input">
        <form>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>

          <input
            placeholder="Write a message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton>
            <TimerOutlined />
          </IconButton>

          <IconButton>
            <EmojiEmotionsOutlinedIcon />
          </IconButton>        

          <IconButton onClick={sendMessage} type="submit">
            <SendRounded />
          </IconButton>

          <IconButton>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Thread;
