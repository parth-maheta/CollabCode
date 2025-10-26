import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Project() {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Modal + user selection state
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);

  // Dummy users
  const users = [
    { id: 1, email: "john@example.com" },
    { id: 2, email: "sara@example.com" },
    { id: 3, email: "max@example.com" },
    { id: 4, email: "alice@example.com" },
    { id: 5, email: "bob@example.com" },
    { id: 6, email: "charlie@example.com" },
  ];

  return (
    <main className="h-screen w-screen flex">
      {/* LEFT CHAT & PANEL */}
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-400">
        {/* HEADER */}
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-200">
          <button
            className="flex gap-2 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <i className="ri-user-add-fill mr-1"></i>
            <p>Add collaborators</p>
          </button>

          <button
            className="p-2 cursor-pointer"
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          >
            <i className="ri-team-fill"></i>
          </button>
        </header>

        {/* CHAT AREA */}
        <div
          className={`conversation-area flex-grow flex flex-col transition-all duration-300 ${
            isSidePanelOpen ? "blur-sm brightness-50" : ""
          }`}
        >
          <div className="message-box p-1 flex-grow flex flex-col gap-1">
            <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Hello</p>
            </div>

            <div className="ml-auto message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Hello</p>
            </div>
          </div>

          <div className="input-field w-full flex">
            <input
              className="p-2 px-4 bg-slate-100 border-none outline-none flex-grow"
              type="text"
              placeholder="Type a message"
            />
            <button className="send-btn px-5 bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div
          className={`sidePanel absolute top-0 left-0 flex flex-col gap-2 w-full h-full bg-slate-100 transition-transform duration-300 ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="flex justify-end p-2 px-3 bg-slate-200">
            <button
              className="p-2 cursor-pointer"
              onClick={() => setIsSidePanelOpen(false)}
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            <div className="user cursor-pointer hover:bg-slate-300 p-2 flex gap-2 items-center ">
              <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                <i className="ri-user-fill absolute"></i>
              </div>
              <h1 className="font-semibold text-lg ">username</h1>
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-SELECT COLLABORATOR MODAL */}
      {showModal && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          ></div>

          {/* MODAL BOX */}
          <div className="fixed top-1/2 left-1/2 w-[90%] sm:w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 flex flex-col h-[70vh] overflow-hidden">
            {/* HEADER */}
            <div className="p-4 border-b font-semibold">Add Collaborators</div>

            {/* SCROLLABLE USER LIST */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {users.map((user) => (
                <label
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition ${
                    selectedUserId.includes(user.id)
                      ? "bg-slate-900 text-white border-slate-800"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedUserId.includes(user.id)}
                    onChange={() =>
                      setSelectedUserId((prev) =>
                        prev.includes(user.id)
                          ? prev.filter((id) => id !== user.id)
                          : [...prev, user.id]
                      )
                    }
                  />
                  <i className="ri-user-fill text-xl"></i>
                  <span className="text-sm font-medium">{user.email}</span>
                </label>
              ))}
            </div>

            {/* FIXED BOTTOM BUTTON */}
            <div className="p-4 border-t bg-white">
              <button
                disabled={!selectedUserId.length}
                onClick={() => {
                  console.log("Selected Users:", selectedUserId);
                  setShowModal(false);
                }}
                className="w-full py-3 font-semibold rounded bg-slate-900 text-white disabled:bg-gray-400 disabled:text-gray-200"
              >
                Add Collaborators
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
