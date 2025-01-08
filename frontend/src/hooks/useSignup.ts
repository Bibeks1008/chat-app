import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { SignupInputsType } from "../pages/signup/Signup";
import apiConfig from "../config/apiConfig";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }: SignupInputsType) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        apiConfig.baseUrl + "/api/auth/signup",
        {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}: SignupInputsType) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
