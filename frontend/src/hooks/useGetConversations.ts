import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import apiConfig from "../config/apiConfig";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = axios.get(apiConfig.baseUrl + "/api/users");

        // setConversations(res?.data?.data);
        console.log("useCOnversation res ===>", res);
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
