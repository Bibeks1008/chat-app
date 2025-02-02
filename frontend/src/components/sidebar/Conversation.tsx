import { useSelector } from "react-redux";
// import { useSocketContext } from "../../context/SocketContext";

import { conversationActions } from "../../store/conversation";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useSocketContext } from "../../context/SocketContext";

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const Conversation = ({
  conversation,
  lastIdx,
}: {
  conversation: any;
  lastIdx: any;
}) => {
  const selectedConversation: any = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  const dispatch: AppDispatch = useDispatch();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
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
          </div>
        </div>
      </div>

      {!lastIdx && (
        <>
          <hr></hr>
          <div className="divider my-0 py-0 h-1" />
        </>
      )}
    </>
  );
};
export default Conversation;
