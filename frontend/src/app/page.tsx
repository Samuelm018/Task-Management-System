"use client";
import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import TaskManager from "@/components/TaskManager";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (loading) return null; // Avoid hydration mismatch or flash

  return (
    <main>
      {!token ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <TaskManager token={token} onLogout={handleLogout} />
      )}
    </main>
  );
}
