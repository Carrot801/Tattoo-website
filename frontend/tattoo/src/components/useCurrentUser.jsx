import { useEffect, useState } from "react";

let cachedUser = null;

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cachedUser) return;
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          cachedUser = null;
        } else {
          const data = await res.json();
          setUser(data.user);
          cachedUser = data.user;
        }
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    isAdmin: user?.role === "ADMIN",
    loading,
  };
};
