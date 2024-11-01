import assets from "../assets/assets.ts";
const Left = () => {
  return (
    <div className="left w-1/4 h-screen border-r overflow-auto no-scrollbar bg-slate-900 ">
      <div>
        <div className="flex flex-col gap-2 sticky w-full top-0 z-20 bg-slate-900 shadow-2xl ">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-2xl font-medium flex items-center ">
              <img className="h-1/3 w-1/6" src={assets.logo_icon} alt="" />
              ChatApp
            </h1>
            <div className="   ">
              <details className="dropdown dropdown-left ">
                <summary className="btn m-1 bg-slate-900 hover:bg-slate-900 btn-circle">
                
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 cursor-pointer hover:text-slate-300"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                </summary>
                <ul className="menu dropdown-content rounded-box z-[1] w-[8rem] p-2 shadow bg-slate-800">
                  <li>
                    <a>Edit profile</a>
                  </li>
                  {/* <li> */}
                    <hr />
                  {/* </li> */}
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
          <div className="flex p-2 gap-2">
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
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="">
          {Array(17)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="">
                <div className="flex p-2 items-center gap-2 hover:bg-gray-200">
                  <div>
                    {" "}
                    <img
                      className="w-12 rounded-full object-cover "
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h2 className="text-lg font-medium ">Anakin Skywalker</h2>
                    <p className="text-sm text-gray-500">How are you?</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Left;
