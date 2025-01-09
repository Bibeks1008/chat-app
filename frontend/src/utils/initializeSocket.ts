import { sockerActions } from "../store/socket";

import openSocket, { Socket } from "socket.io-client";
import { useState } from "react";
import { Dispatch } from "redux";

export const initializeSocket =
  (authUser: any) =>
  (dispatch: Dispatch): (() => void) | undefined => {
    const [socket, setSocket] = useState<Socket | null>(null);
    if (authUser) {
      const socket = openSocket("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      dispatch(sockerActions.setSocket(socket));

      // Listen for online users
      socket.on("getOnlineUsers", (users) => {
        dispatch(sockerActions.setOnlineUsers(users));
      });

      // Cleanup on disconnection
      return () => {
        socket.close();
      };
    } else {
      // Handle case when user is not authenticated
      if (socket) {
        socket.close();
        dispatch(sockerActions.setSocket(null));
      }

      return undefined;
    }
  };
