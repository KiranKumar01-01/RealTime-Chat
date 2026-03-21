import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages = [],
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  // ✅ FETCH MESSAGES SAFELY
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);

    // optional (prevents crash if not defined)
    if (typeof subscribeToMessages === "function") {
      subscribeToMessages();
    }

    return () => {
      if (typeof unsubscribeFromMessages === "function") {
        unsubscribeFromMessages();
      }
    };
  }, [selectedUser,getMessagesByUserId,subscribeToMessages,unsubscribeFromMessages]);

  // ✅ AUTO SCROLL
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ IF NO USER SELECTED
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select a user to start chatting
      </div>
    );
  }

  

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser?._id
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser?._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {/* IMAGE */}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}

                  {/* TEXT */}
                  {msg.text && <p className="mt-2">{msg.text}</p>}

                  {/* TIME */}
                  <p className="text-xs mt-1 opacity-75">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* AUTO SCROLL TARGET */}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder
            name={selectedUser?.fullName || "User"}
          />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;