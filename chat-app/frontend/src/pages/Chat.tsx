import ChatSec from "../components/ChatSec";
import Left from "../components/Left";
import Right from "../components/Right";

const Chat = () => {
  return (
    <div className="flex">
      <Left />
      <ChatSec />

      <Right />
    </div>
  );
};

export default Chat;
