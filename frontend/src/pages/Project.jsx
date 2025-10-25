import React from "react";
import { useLocation } from "react-router-dom";
export default function Project() {
  const location = useLocation();
  console.log(location.state);
  return (
    <main className="h-screen w-screen flex">
      <section className="left flex flex-col  h-full min-w-72 bg-slate-400">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-200">
          <button className="p-2 cursor-pointer">
            <i className="ri-team-fill"></i>
          </button>
        </header>
        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box flex-grow flex flex-col">
            <div className="incoming message flex flex-col ">
              <small>example@gmail.com</small>
              hello
            </div>
          </div>
          <div className="input-field w-full flex">
            <input
              className="p-2 px-4  border-none outline-none  "
              type="text"
              placeholder="Type a message"
            />
            <button className="send-btn flex-grow px-3">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
