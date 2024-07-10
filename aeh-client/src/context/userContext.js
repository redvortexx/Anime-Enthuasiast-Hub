import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setUser(null);
          localStorage.removeItem("authToken");
          toast.error("Session expired, please log in again.");
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, []);

  const updateUser = (newUserData, token = null) => {
    setUser(newUserData);
    if (newUserData && token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loading }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
}
