import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { authActions } from "../../store/auth";
import { useState } from "react";
import toast from "react-hot-toast";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("chat-user");
      dispatch(authActions.setAuthUser(null));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
