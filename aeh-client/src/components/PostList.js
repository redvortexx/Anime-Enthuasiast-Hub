import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import { UserContext } from "../context/userContext";
import { toast } from "react-hot-toast";
import "../styles/Forum.scss";

const PostList = () => {
  const { user } = useContext(UserContext);
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);
  const [thread, setThread] = useState({});
  const [forum, setForum] = useState({});
  const [newPostContent, setNewPostContent] = useState("");
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [threadRes, postsRes] = await Promise.all([
          axios.get(`/api/threads/${threadId}`),
          axios.get(`/api/threads/${threadId}/posts`),
        ]);
        setThread(threadRes.data);
        setPosts(postsRes.data);

        const forumRes = await axios.get(
          `/api/forums/${threadRes.data.forum_id}`
        );
        setForum(forumRes.data);
      } catch (error) {
        toast.error("Error fetching posts");
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [threadId]);

  const handleCreatePost = async () => {
    if (!user) {
      toast.error("User is not logged in.");
      console.error("User is not logged in.");
      return;
    }
    if (newPostContent.trim() === "") {
      toast.error("Post content is required.");
      console.error("Post content is required.");
      return;
    }
    try {
      const response = await axios.post("/api/posts", {
        thread_id: threadId,
        content: newPostContent,
      });
      setPosts([...posts, response.data]);
      setNewPostContent("");
      toast.success("Post created successfully");

      const postsRes = await axios.get(`/api/threads/${threadId}/posts`);
      setPosts(postsRes.data);
    } catch (error) {
      toast.error("Error creating post");
      console.error("Error creating post:", error);
    }
  };

  const handleCreateComment = async (postId) => {
    if (!user) {
      toast.error("User is not logged in.");
      console.error("User is not logged in.");
      return;
    }
    if (newCommentContent[postId]?.trim() === "") {
      toast.error("Comment content is required.");
      console.error("Comment content is required.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/comments",
        {
          post_id: postId.toString(),
          content: newCommentContent[postId],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
      setNewCommentContent((prevContent) => ({
        ...prevContent,
        [postId]: "",
      }));
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error("Error adding comment");
      console.error("Error adding comment:", error);
      console.error("Error response data:", error.response.data);
    }
  };

  const handleCommentChange = (postId, value) => {
    setNewCommentContent((prevContent) => ({
      ...prevContent,
      [postId]: value,
    }));
  };

  const toggleComments = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  return (
    <div className="container">
      <Breadcrumb
        paths={[
          { name: "Forums", url: "/forums" },
          {
            name: forum.title || "Loading...",
            url: `/forums/${forum.id}/threads`,
          },
          { name: thread.title || "Loading..." },
        ]}
      />
      <h1 className="post__h1">Posts in {thread.title}</h1>
      <div className="post__create">
        <h2>Create a New Post</h2>
        <textarea
          placeholder="Post Content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h3 className="post__h3">
            <button
              className="post__button"
              onClick={() => toggleComments(post.id)}
            >
              {post.content}
            </button>
          </h3>
          {expandedPostId === post.id && (
            <div className="post__comments">
              {post.comments.map((comment) => (
                <div key={comment.id} className="post__comment">
                  <p>
                    {comment.content} - <strong>{comment.username}</strong> on{" "}
                    {new Date(comment.created_at).toLocaleString(undefined, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
              ))}
              <div className="post__add-comment">
                <textarea
                  placeholder="Add a comment..."
                  value={newCommentContent[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button onClick={() => handleCreateComment(post.id)}>
                  Add Comment
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
