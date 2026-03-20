import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-3">
      {/* ✅ If no contacts */}
      {(!allContacts || allContacts.length === 0) && (
        <p className="text-slate-400 text-center">No contacts found</p>
      )}

      {/* ✅ Safe rendering */}
      {allContacts?.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                Array.isArray(onlineUsers) && onlineUsers.includes(contact._id)
                  ? "online"
                  : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>

            <h4 className="text-slate-200 font-medium">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ContactList;