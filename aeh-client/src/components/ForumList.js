import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-hot-toast";
import "../styles/Forum.scss";

const ForumList = () => {
  const { user, loading } = useContext(UserContext);
  const [forums, setForums] = useState([]);
  const [newForumTitle, setNewForumTitle] = useState("");
  const [newForumCategory, setNewForumCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get("/api/forums");
        setForums(response.data);
      } catch (error) {
        toast.error("Error fetching forums");
        console.error("Error fetching forums:", error);
      }
    };

    fetchForums();
  }, []);

  const handleCreateForum = async () => {
    if (!user) {
      toast.error("User is not logged in.");
      console.error("User is not logged in.");
      return;
    }
    if (newForumTitle.trim() === "" || newForumCategory.trim() === "") {
      toast.error("Title and category are required.");
      console.error("Title and category are required.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/forums",
        {
          title: newForumTitle,
          category: newForumCategory,
          created_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setForums((prevForums) => [...prevForums, response.data]);
      setNewForumTitle("");
      setNewForumCategory("");
      toast.success("Forum created successfully");
    } catch (error) {
      toast.error("Error creating forum");
      console.error("Error creating forum:", error);
    }
  };

  const handleThreadNavigation = (forumId) => {
    navigate(`/forums/${forumId}/threads`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <div className="container">
      <Breadcrumb paths={[{ name: "Forums" }]} />
      <div className="create-forum">
        <h2>Create a New Forum</h2>
        <input
          type="text"
          placeholder="Forum Title"
          value={newForumTitle}
          onChange={(e) => setNewForumTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={newForumCategory}
          onChange={(e) => setNewForumCategory(e.target.value)}
        />
        <button onClick={handleCreateForum}>Create Forum</button>
      </div>
      {forums.map((forum) => (
        <div className="subforum" key={forum.id}>
          <div className="subforum-title">
            <h1>{forum.title}</h1>
          </div>
          <div className="subforum-row">
            <div className="subforum-icon subforum-column center">
              <img
                src="http://localhost:8080/images/forum-icon.png"
                alt="Forum Icon"
                className="forum-icon"
              />
            </div>
            <div className="subforum-description subforum-column">
              <h4>
                <button
                  className="subforum-button"
                  onClick={() => handleThreadNavigation(forum.id)}
                >
                  {forum.title}
                </button>
              </h4>
              <p>{forum.description}</p>
            </div>
            <div className="subforum-stats subforum-column center">
              <span>
                {forum.total_threads} Threads | {forum.category}
              </span>
            </div>
            <div className="subforum-info subforum-column">
              <b>Forum created by</b>{" "}
              <button className="subforum-button">
                {forum.created_by_username}
              </button>
              <br />
              on <small>{new Date(forum.created_at).toLocaleString()}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumList;
