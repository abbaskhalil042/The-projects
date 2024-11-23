import ChatSec from "../components/ChatSec";
import Left from "../components/Left";
import Right from "../components/Right";

const Chat = () => {
  return (
    <div className="flex pt-1">
      <Left />
      <ChatSec />
      <Right />
    </div>
  );
};

export default Chat;
