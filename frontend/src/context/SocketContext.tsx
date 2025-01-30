import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSelector } from "react-redux";
import openSocket, { Socket } from "socket.io-client";
import { RootState } from "../store";
import apiConfig from "../config/apiConfig";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
}

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    if (authUser) {
      const socketInstance = openSocket(apiConfig.baseUrl, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup the socket connection on unmount or when authUser changes
      return () => {
        socketInstance.close();
      };
    } else {
      // Cleanup the socket if authUser becomes null
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  const contextValue: SocketContextType = { socket, onlineUsers };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
