import { useState } from "react";
import toast from "react-hot-toast";
import apiConfig from "../config/apiConfig";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(apiConfig.baseUrl + "/api/auth/login", {
        username,
        password,
      });

      console.log(res);
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
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
