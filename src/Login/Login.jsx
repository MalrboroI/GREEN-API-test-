import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(idInstance, apiTokenInstance);
  };

  return (
    <div className="login">
      <h2>Введите свои учетные данные</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
        <input
          type="text"
          placeholder="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;