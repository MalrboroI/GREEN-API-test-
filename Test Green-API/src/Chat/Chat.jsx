import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "../Message/Message";
import Input from "../Input/Input";

export default function Chat({ idInstance, apiTokenInstance }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Функция для отправки сообщения sendMessage
  const sendMessage = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    try {
      const response = await axios.post(url, {
        chatId: `${phoneNumber}@c.us`,
        message: inputValue,
      });
      console.log("Сообщение отправлено:", response.data);
      setMessages([...messages, { text: inputValue, isMyMessage: true }]);
      setInputValue("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  // Функция для получения сообщений receiveNotification
  const receiveMessages = async () => {
    const url = `https://1103.api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url, {
        chatId: `${phoneNumber}@c.us`,
        params: {
          receiveTimeout: 5,
        },
      });
      if (response.data) {
        const notification = response.data;

        if (notification.body.typeWebhook === "incomingMessageReceived") {
          const webhookData = notification.body.messageData;

          if (webhookData.typeMessage === "textMessage") {
            const newMessage = {
              text: webhookData.textMessageData.textMessage,
              isMyMessage: false,
            };
            setMessages([...messages, newMessage]);
          }

          const receiptId = notification.receiptId;
          await axios.delete(
            `https://1103.api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
          );
        }
      }
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessages, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat">
      <div className="chat-header">
        <input
          type="tel"
          placeholder="Номер телефона получателя"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isMyMessage={message.isMyMessage}
          />
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sendMessage={sendMessage}
      />
      <button className="check-messages-button" onClick={receiveMessages}>
        Проверить новые сообщения
      </button>
    </div>
  );
}
