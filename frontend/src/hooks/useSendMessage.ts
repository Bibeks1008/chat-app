import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { conversationActions } from "../store/conversation";
import apiConfig from "../config/apiConfig";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.conversation.messages
  );
  const selectedConversation: any = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        apiConfig.baseUrl + `/api/messages/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res) throw new Error("Error in sending message");

      dispatch(conversationActions.setMessages([...messages, res?.data]));
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
