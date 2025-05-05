/** @format */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import apiConfig from "../config/apiConfig";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<any>([]);

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await axios.get(apiConfig.baseUrl + "/api/users", {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        });

        setConversations(res?.data);
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
