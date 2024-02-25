import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setThread } from "../features/threadSlice";
import { Avatar } from "@mui/material";
import db from "../firebase";
import "./sidebarThreads.css";

const SidebarThreads = ({ id, threadName }) => {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);

  useEffect(() => {
    db.collection("threads")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setThreadInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      className="sidebarThreads"
      onClick={() =>
        dispatch(
          setThread({
            threadId: id,
            threadName: threadName,
          })
        )
      }
    >
      <Avatar src={threadInfo[0]?.photo} />
      <div className="sidebarThreads_details">
        <h3>{threadName}</h3>
        <p>{threadInfo[0]?.message}</p>
        {/* <p>hello</p> */}
        <small className="sidebarThreads_timestamp">
          {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
      </div>
    </div>
  );
};

export default SidebarThreads;
