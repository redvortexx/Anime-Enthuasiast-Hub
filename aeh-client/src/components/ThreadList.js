import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import { UserContext } from "../context/userContext";
import { toast } from "react-hot-toast";
import "../styles/Forum.scss";

const ThreadList = () => {
  const { user } = useContext(UserContext);
  const { forumId } = useParams();
  const [threads, setThreads] = useState([]);
  const [forum, setForum] = useState({});
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const [forumRes, threadsRes] = await Promise.all([
          axios.get(`/api/forums/${forumId}`),
          axios.get(`/api/forums/${forumId}/threads`),
        ]);
        setForum(forumRes.data);
        setThreads(threadsRes.data);
      } catch (error) {
        toast.error("Error fetching threads");
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, [forumId]);

  const handleCreateThread = async () => {
    if (!user) {
      toast.error("User is not logged in.");
      console.error("User is not logged in.");
      return;
    }
    if (newThreadTitle.trim() === "") {
      toast.error("Thread title is required.");
      console.error("Thread title is required.");
      return;
    }
    try {
      const response = await axios.post("/api/threads", {
        forum_id: forumId,
        title: newThreadTitle,
      });
      setThreads((prevThreads) => [...prevThreads, response.data]);
      setNewThreadTitle("");
      toast.success("Thread created successfully");

      const threadsRes = await axios.get(`/api/forums/${forumId}/threads`);
      setThreads(threadsRes.data);
    } catch (error) {
      toast.error("Error creating thread");
      console.error("Error creating thread:", error);
    }
  };

  const handlePostNavigation = (threadId) => {
    navigate(`/threads/${threadId}/posts`);
  };

  return (
    <div className="container">
      <Breadcrumb
        paths={[
          { name: "Forums", url: "/forums" },
          { name: forum.title || "Loading..." },
        ]}
      />
      <h1 className="thread__h1">Threads in {forum.title}</h1>
      <div className="create-thread">
        <h2>Create a New Thread</h2>
        <input
          type="text"
          placeholder="Thread Title"
          value={newThreadTitle}
          onChange={(e) => setNewThreadTitle(e.target.value)}
        />
        <button onClick={handleCreateThread}>Create Thread</button>
      </div>
      {threads.length === 0 && <p>No threads found</p>}
      {threads.map((thread) => (
        <div className="thread" key={thread.id}>
          <h3 className="thread__h3">
            <button
              className="thread__button"
              onClick={() => handlePostNavigation(thread.id)}
            >
              {thread.title}
            </button>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
