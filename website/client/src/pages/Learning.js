// src/pages/LearningPage.js
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import VideoRoom from "../components/VideoRoom";
import Playground from "../components/Playground";

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("video");
  const [darkMode, setDarkMode] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  const [notesWidth, setNotesWidth] = useState(320);

  return (
    <div
      className={`min-h-screen font-poppins ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center p-2 border-b border-gray-300 dark:border-gray-700">
        {/* Left */}
        <h1 className="text-2xl font-bold text-primary">Code Environment</h1>

        {/* Center Tabs */}
        <div className="flex justify-center gap-6">
          {["video", "playground", "notes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold rounded-t ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Right */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Header */}
      {/* <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-primary">Code Environment</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div> */}

      {/* Tab Bar */}
      {/* <div className="flex justify-center gap-6 border-b border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800"> */}
      {/* <div className="flex justify-center gap-6 border-b border-gray-300 dark:border-gray-700 p-3 ">
        {["video", "playground", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold rounded-t ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div> */}

      {/* Main Area */}
      <div className="relative flex-1 h-[90vh] overflow-hidden">
        {/* Video full screen */}
        {activeTab === "video" && (
          <div className="w-full h-full">
            <VideoRoom darkMode={darkMode} />
          </div>
        )}

        {/* Playground (with its own PiP inside) */}
        {activeTab === "playground" && (
          <div className="w-full h-full">
            <Playground darkMode={darkMode} />
          </div>
        )}

        {/* Playground + Notes Drawer */}
        {activeTab === "notes" && (
          <div className="w-full h-full relative flex">
            {/* Playground takes remaining space */}
            <div className="flex-1">
              <Playground darkMode={darkMode} />
            </div>

            {/* Collapsible + Resizable Notes */}
            {notesOpen && (
              <ResizableBox
                width={notesWidth}
                height={Infinity}
                axis="x"
                minConstraints={[240, Infinity]}
                maxConstraints={[600, Infinity]}
                resizeHandles={["w"]}
                onResizeStop={(e, data) => setNotesWidth(data.size.width)}
                className="absolute top-0 right-0 h-full shadow-lg border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div className="h-full relative">
                  {/* Collapse button at left edge */}
                  <button
                    onClick={() => setNotesOpen(false)}
                    className="absolute left-0 top-1/2 -translate-x-full transform bg-primary text-white px-1 py-1 rounded-l"
                  >
                    ❮
                  </button>

                  <div className="p-4 h-full flex flex-col">
                    <h2 className="text-lg font-bold mb-2">Notes</h2>
                    <textarea
                      className="w-full flex-1 p-2 rounded border dark:bg-gray-900 dark:border-gray-600"
                      placeholder="Write your notes here..."
                    />
                  </div>
                </div>
              </ResizableBox>
            )}

            {/* Reopen button when collapsed */}
            {!notesOpen && (
              <button
                onClick={() => setNotesOpen(true)}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary text-white px-2 py-2 rounded-l"
              >
                ❯
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
