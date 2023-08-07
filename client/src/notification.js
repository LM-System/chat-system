import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Notification({ socket, username, room }) {
  const [currentNotification, setCurrentNotification] = useState("");
  const [notificationList, setNotificationList] = useState([]);

  const sendNotification = async () => {
    if (currentNotification !== "") {
      const notificationData = {
        sender_id:1,
        reciever_id: 2,
        room_id:room,
        notification: currentNotification,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_notification", notificationData);
    //   setNotificationList((list) => [...list, notificationData]);
      setCurrentNotification("");
    }
};


useEffect(() => {
    socket.on("receive_notification", (data) => {
        console.log(data);
        setNotificationList((list) => Array.from(new Set([...list, data])));

    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="notification-container">
          {notificationList.map((notificationContent) => {
            return (
              <div
                className="notification"
                id={username === notificationContent.author ? "you" : "other"}
              >
                <div>
                  <div className="notification-content">
                    <p>{notificationContent.notification}</p>
                  </div>
                  <div className="notification-meta">
                    <p id="time">{notificationContent.time}</p>
                    <p id="author">{notificationContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentNotification}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentNotification(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendNotification();
          }}
        />
        <button onClick={sendNotification}>&#9658;</button>
      </div>
    </div>
  );
}

export default Notification;