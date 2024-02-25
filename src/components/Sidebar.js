import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import SidebarThreads from "./sidebarThreads";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import db, { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) =>
      setThreads(
        snapshot.docs.map((docs) => ({
          id: docs.id,
          data: docs.data(),
        }))
      )
    );
  }, []);

  const addThread = () => {
    const threadName = prompt("Enter a name :");
    // const threadName = prompt('Enter a thread name.');
    if (threadName) {
      db.collection("threads").add({
        threadName: threadName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_search">
          <SearchIcon className="sidebar_searchIcon" />
          <input className="sidebar_input" placeholder="Search"></input>

      {/* addThread */}
        </div>
        <IconButton variant="outlined" id="sidebar_button">
          <BorderColorOutlinedIcon onClick={addThread} />
        </IconButton>
      </div>

      {/* SidebarThreads.js */}
      <div className="sidebar_threads">
        {threads.map(({ id, data: { threadName } }) => (
          <SidebarThreads key={id} id={id} threadName={threadName} />
        ))}
      </div>

      {/* signOut */}
      <div className="sidebar_bottom">
        <Avatar
          className="sidebar_bottom_avatar"
          onClick={() => auth.signOut()}
        />

      {/* icons */}
        <IconButton>
          <PhoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
