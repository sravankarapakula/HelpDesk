import React, { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Helpdesk from "./pages/Helpdesk";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  if (!user) return <Auth onLogin={setUser} />;

  return (
    <div>
      <header className="bg-blue-700 text-white flex justify-between items-center px-6 py-3">
        <h1 className="font-semibold">
          Welcome, {user.name || user.email} ({user.role})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100"
        >
          Logout
        </button>
      </header>

      <Helpdesk isAdmin={user.role === "Admin"} />
    </div>
  );
}
