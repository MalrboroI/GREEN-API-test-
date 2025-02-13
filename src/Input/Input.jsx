import React from "react";

export default function Input({ value, onChange, sendMessage }) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Введите сообщение..."
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};
