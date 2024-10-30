const Left = () => {
  return (
    <div className="left w-1/4 h-screen border-r ">
      <div>
        <h1>chatApp</h1>
        <div>
          <input
            type="text"
            placeholder="search"
            className="input input-bordered w-full"
          />
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

          <div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i}>User</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
