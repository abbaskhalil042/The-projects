const Right = () => {
  return (
    <div className="right w-1/4 h-screen bg-slate-900 border-l overflow-y-auto no-scrollbar ">
      <div className="flex flex-col justify-center mt-6 items-center sticky top-0 bg-slate-900 shadow-2xl z-2 ">
   
        <div>
          <img
            className="w-24 rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1> Anakin Skywalker </h1>
          <p>Hey, there I am your friend</p>
          <span>Online</span>
          <div className="w-full h-0.5 bg-white" />
          <span>Media</span>
        </div>
      </div>

      <div className="grid justify-center items-center grid-cols-3 gap-2 p-2 ">
        {Array(30)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <img
                className="w-24 rounded-lg"
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Right;
