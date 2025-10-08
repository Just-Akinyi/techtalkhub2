import React, { useEffect, useRef, useState } from "react";

export default function VideoRoom({ darkMode }) {
  const containerRef = useRef(null);
  const [jitsiLoaded, setJitsiLoaded] = useState(true);

  useEffect(() => {
    if (!window.JitsiMeetExternalAPI) {
      console.error(
        "Jitsi Meet API not loaded. Make sure external_api.js is in index.html"
      );
      setJitsiLoaded(false);
      return;
    }

    const domain = "meet.jit.si";
    const options = {
      roomName: "TechTalkHubClassroom", // make this dynamic per session if needed
      parentNode: containerRef.current,
      interfaceConfigOverwrite: {
        DEFAULT_BACKGROUND: darkMode ? "#1f2937" : "#ffffff",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      api.dispose(); // cleanup on unmount
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 shadow rounded-lg overflow-hidden flex items-center justify-center ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      style={{ height: "500px" }}
    >
      {!jitsiLoaded && (
        <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Video not available. Please check your internet connection or reload the page.
        </div>
      )}
    </div>
  );
}



// import React, { useRef, useState } from "react";

// export default function VideoRoom({ darkMode }) {
//   const videoRef = useRef(null);
//   const [isPiP, setIsPiP] = useState(false);

//   const startPiP = async () => {
//     try {
//       if (videoRef.current) {
//         if (!document.pictureInPictureElement) {
//           await videoRef.current.requestPictureInPicture();
//           setIsPiP(true);
//         } else {
//           await document.exitPictureInPicture();
//           setIsPiP(false);
//         }
//       }
//     } catch (err) {
//       console.error("PiP failed", err);
//     }
//   };

//   return (
//     <div
//       className={`flex-1 shadow rounded-lg p-3 flex flex-col ${
//         darkMode ? "bg-gray-800" : "bg-white"
//       }`}
//     >
//       <h2 className="text-lg font-semibold mb-2">Video Call</h2>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="w-full h-64 rounded"
//         style={{ backgroundColor: "#000" }}
//       />
//       <button
//         onClick={startPiP}
//         className="mt-2 px-4 py-2 rounded bg-primary text-white"
//       >
//         Toggle PiP
//       </button>
//       <div className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//         PiP: {isPiP ? "Active" : "Not Active"}
//       </div>
//     </div>
//   );
// }
