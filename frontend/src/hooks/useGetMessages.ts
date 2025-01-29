import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { conversationActions } from "../store/conversation";
import apiConfig from "../config/apiConfig";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const messages: any = useSelector(
    (state: RootState) => state.conversation.messages
  );
  const selectedConversation: any = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          apiConfig.baseUrl + `/api/messages/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
        if (!res) throw new Error("Error in fetching message response");

        console.log("in get messages ===> ", res);

        dispatch(conversationActions.setMessages(res?.data));
        // setMessages(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);

  return { messages, loading };
};
export default useGetMessages;
