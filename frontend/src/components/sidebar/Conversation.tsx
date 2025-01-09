import { useSelector } from "react-redux";
// import { useSocketContext } from "../../context/SocketContext";

import { conversationActions } from "../../store/conversation";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSocket } from "../../utils/initializeSocket";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
// import useConversation from "../../zustand/useConversation";


type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const Conversation = ({
  conversation,
  lastIdx,
}: {
  conversation: any;
  lastIdx: any;
}) => {
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation.selectedConverstion
  );

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const dispatch: AppDispatch = useDispatch();
  // const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    const cleanup = dispatch(initializeSocket(authUser));

    // Return the cleanup function for useEffect
    return typeof cleanup === "function" ? cleanup : undefined;
  }, [authUser, dispatch]);

  const isSelected = selectedConversation?._id === conversation._id;
  // const { onlineUsers } = useSocketContext();
  const onlineUsers = useSelector(
    (state: RootState) => state.socket.onlineUsers
  );
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() =>
          dispatch(conversationActions.setSelectedConversation(conversation))
        }
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            {/* <span className="text-xl">{emoji}</span> */}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
