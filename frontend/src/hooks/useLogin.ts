import { useState } from "react";
import toast from "react-hot-toast";
import apiConfig from "../config/apiConfig";
import axios from "axios";
import { useDispatch } from "react-redux";

import { authActions } from "../store/auth";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        apiConfig.baseUrl + "/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("chat-user", JSON.stringify(res?.data?.data));
      dispatch(authActions.setAuthUser(res?.data?.data));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error("Please fill all fields");
    return false;
  }

  return true;
}
