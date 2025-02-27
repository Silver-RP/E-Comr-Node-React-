import { useNotification } from "../../../context/NotificationContext";

const Notification = () => {
  const { notification } = useNotification() as unknown as { notification: string };

  if (!notification) return null;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "yellowgreen",
      color: "black",
      padding: "10px",
      borderRadius: "5px",
      zIndex: 1000,
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}>
      {notification}
    </div>
  );
};

export default Notification;
