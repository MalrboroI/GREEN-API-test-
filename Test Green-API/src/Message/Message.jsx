import React from "react";

export default function Message({ text, isMyMessage }) {
  return (
    <div className={`message ${isMyMessage ? "my-message" : "other-message"}`}>
      {text}
    </div>
  );
};
