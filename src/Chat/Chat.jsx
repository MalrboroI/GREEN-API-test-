import React, { useState, useEffect, useCallback } from "react";
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

  // Функция для получения сообщений receiveNotification. Обязательная мемоизация ф-и receiveMessages
  const receiveMessages = useCallback(async () => {
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

        if (notification.body.typeWebhook === "outgoingAPIMessageReceived") {
          const webhookData = notification.body.messageData;

          const newMessage = {
            senderName: notification.body.senderData.senderName,
            text:
              webhookData.extendedTextMessageData.text ||
              "Неподдерживаемый тип сообщения",
            id: notification.body.idMessage,
            isMyMessage: false,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        const receiptId = notification.receiptId;
        await axios.delete(
          `https://1103.api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
        );
      }
    } catch (error) {
      console.error("Ошибка при получении сообщения:", error);
    }
  }, [idInstance, apiTokenInstance, phoneNumber]);

  
  useEffect(() => {
    const intervalId = setInterval(receiveMessages, 6000);
    return () => clearInterval(intervalId);
  }, [receiveMessages]);

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
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            isMyMessage={message.isMyMessage}
            senderName={message.senderName}
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
