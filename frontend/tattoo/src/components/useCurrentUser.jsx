import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null); // Stores user info from backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use Render URL in production, localhost for dev
        const res = await fetch("/api/auth/me", {
          credentials: "include", // <-- sends cookies
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user); // expects { id, role }
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

  // Boolean flag to check admin role
  const isAdmin = user?.role === "ADMIN";

  return { user, isAdmin, loading };
};
