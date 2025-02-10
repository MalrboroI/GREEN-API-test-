import React, { useState } from "react";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleLogin = (idInstance, apiTokenInstance) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setIsLogged(true);
  };

  return (
    <div className="app">
      {!isLogged ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      )}
    </div>
  );
}
