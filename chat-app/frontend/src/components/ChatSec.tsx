const ChatSec = () => {
  return (
    <div className="flex flex-col w-1/2 h-screen shadow-2xl rounded-lg overflow-hidden">
      {/* Top section (User info) */}
      <div className="user-name bg-slate-800 flex  gap-2 items-center px-2 py-1 shadow-2xl sticky top-0 z-10">
        <img
          className="w-10 rounded-full"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="User"
        />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium text-white">
              Anakin Skywalker
            </h2>
            <p className="text-sm opacity-50 text-white">Online</p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
      </div>

      {/* Chat messages section (Scrollable) */}
      {/* <div className=""> */}
      <div className="flex-1 overflow-y-auto p-2 no-scrollbar rounded-r-lg">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col mb-16  ">
              <div className="chat chat-start px-2">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              <div className="chat chat-end p-2">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>

              <div className="chat chat-end p-2">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                {/* <div className="chat-bubble w-1/2"> */}
                <img
                  className="w-1/3 rounded-md"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt=""
                />
                {/* </div> */}
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            </div>
          ))}
      </div>
      {/* </div> */}

      {/* Input section (Fixed at bottom) */}
      <div className="bg-slate-800 p-1 mt-8 flex gap-2 items-center fixed bottom-0 w-1/2 ">
        <input
          type="text"
          placeholder="Type your message"
          className="input input-bordered w-full"
        />
        <label>
          <input type="file" className="hidden" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute right-[6rem] bottom-4 cursor-pointer hover:text-orange-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </label>

        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatSec;
