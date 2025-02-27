import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
const [notification, setNotification] = useState(null);

const showNotification = (message: React.SetStateAction<null>, duration = 3000) => {
    setNotification(message);
    setTimeout(() => {
        setNotification(null);
    }, duration);
};

return (
    <NotificationContext.Provider value={{ notification, showNotification } as any}>
        {children}
    </NotificationContext.Provider>
);
};

export const useNotification = () => useContext(NotificationContext);
