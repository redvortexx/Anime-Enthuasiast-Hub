import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import HomePage from "../pages/HomePage";

function Main() {
  const { user, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/profile");
        updateUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        updateUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user, updateUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <HomePage />;
  }

  return <Navigate to="/login" />;
}

export default Main;
