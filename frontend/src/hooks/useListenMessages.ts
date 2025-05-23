import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch } from "react-redux";
import { conversationActions } from "../store/conversation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useListenMessages = () => {
  const { socket } = useSocketContext();

  const dispatch = useDispatch();

  const messages = useSelector(
    (state: RootState) => state.conversation.messages
  );

  const selectedConversation: any = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      console.log("newMessage is ===> ", newMessage);
      if (newMessage?.senderId === selectedConversation._id) {
        dispatch(conversationActions.setMessages([...messages, newMessage]));
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages]);
};
export default useListenMessages;
