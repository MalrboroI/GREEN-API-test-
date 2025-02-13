import React from "react";

export default function Message({ text, isMyMessage, senderName }) {
  return (
    <div className={`message ${isMyMessage ? "my-message" : "other-message"}`}>
      {isMyMessage === false ? (
        <p>
          <strong>{senderName} </strong>: {text}
        </p>
      ) : (
        text
      )}
    </div>
  );
}
