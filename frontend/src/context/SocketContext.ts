// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
//   PropsWithChildren,
// } from "react";
// import { useSelector } from "react-redux";
// import openSocket, { Socket } from "socket.io-client";
// import { RootState } from "../store";

// // Define the shape of the socket context
// interface SocketContextType {
//   socket: Socket | null;
//   onlineUsers: any[];
// }

// interface SocketContextProviderProps {
//   children: ReactNode;
// }

// // Create the context with a default value of `null`
// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   onlineUsers: [],
// });

// // Custom hook to consume the context
// // export const useSocketContext = () => {
// //   const context = useContext(SocketContext);
// //   if (!context) {
// //     throw new Error(
// //       "useSocketContext must be used within a SocketContextProvider"
// //     );
// //   }
// //   return context;
// // };

// // Context provider component
// const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
//   children,
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

//   const authUser = useSelector((state: RootState) => state.auth.authUser);

//   useEffect(() => {
//     if (authUser) {
//       // Initialize the socket connection
//       const socketInstance = openSocket("http://localhost:8080", {
//         query: {
//           userId: authUser._id,
//         },
//       });

//       setSocket(socketInstance);

//       // Listen for the "getOnlineUsers" event
//       socketInstance.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });

//       // Cleanup the socket connection on unmount or when authUser changes
//       return () => {
//         socketInstance.close();
//       };
//     } else {
//       // Cleanup the socket if authUser becomes null
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);

//   // Define the value to be provided to children
//   const contextValue: SocketContextType = { socket, onlineUsers };

//   return (
//     <SocketContext.Provider value={contextValue}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketContextProvider;
