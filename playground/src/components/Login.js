import React, { useState, useRef, useEffect, Suspense } from "react";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

// Lazy-load CodeMirror
const CodeMirror = React.lazy(() => import("@uiw/react-codemirror"));

// Lazy-load Skulpt
const loadSkulpt = () => {
  return new Promise((resolve, reject) => {
    if (window.Sk) return resolve();

    const skulptScript = document.createElement("script");
    skulptScript.src = "/skulpt/skulpt.min.js"; // local path
    skulptScript.async = true;

    skulptScript.onload = () => {
      const stdlibScript = document.createElement("script");
      stdlibScript.src = "/skulpt/skulpt-stdlib.js"; // local path
      stdlibScript.async = true;

      stdlibScript.onload = () => {
        if (window.Sk) {
          window.Sk.pre = "output";
          window.Sk.configure({
            output: (text) => {
              const output = document.getElementById("output");
              if (output) output.innerHTML += text.replace(/\n/g, "<br/>");
            },
            read: (x) => {
              if (!window.Sk.builtinFiles || !window.Sk.builtinFiles["files"][x]) {
                throw new Error("File not found: '" + x + "'");
              }
              return window.Sk.builtinFiles["files"][x];
            },
          });
        }
        resolve();
      };

      stdlibScript.onerror = (e) => reject(new Error("Failed to load Skulpt stdlib"));
      document.body.appendChild(stdlibScript);
    };

    skulptScript.onerror = (e) => reject(new Error("Failed to load Skulpt core"));
    document.body.appendChild(skulptScript);
  });
};

export default function LoginPage() {
  const [mode, setMode] = useState("web");
  const [pythonCode, setPythonCode] = useState(
    "print('Hello, Python!')\nfor i in range(3):\n print(i)"
  );
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: purple; }");
  const [jsCode, setJsCode] = useState("console.log('JS loaded!');");
  const [jsOutput, setJsOutput] = useState("");
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [isPiP, setIsPiP] = useState(false);

  const runPython = async () => {
    try {
      await loadSkulpt();
    } catch (err) {
      alert("Failed to load Skulpt: " + err);
      return;
    }

    const output = document.getElementById("output");
    if (output) output.innerHTML = "";

    try {
      window.Sk.compile(pythonCode, "<stdin>", "exec");
      await window.Sk.misceval.asyncToPromise(() =>
        window.Sk.importMainWithBody("<stdin>", false, pythonCode, true)
      );
    } catch (err) {
      if (output) output.innerHTML = `<span style="color:red;">${err.toString()}</span>`;
    }
  };

  // JS live preview
  useEffect(() => {
    if (mode !== "web") return;
    const timer = setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
          <head><style>${cssCode}</style></head>
          <body>
            ${htmlCode}
            <script>
              console.log = (...args) => parent.postMessage({ type: 'js-log', message: args.join(' '), isError: false }, '*');
              window.onerror = (msg, url, line, col, error) => {
                parent.postMessage({ type: 'js-log', message: 'Error: ' + msg + ' at line ' + line, isError: true }, '*');
              };
              try { ${jsCode} } catch(e) { console.log('Error:', e); }
            </script>
          </body>
        </html>
      `);
      doc.close();
    }, 400);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, mode]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "js-log") {
        const log = event.data.isError
          ? `<span style="color:red;">${event.data.message}</span>`
          : `<span style="color:lightgreen;">${event.data.message}</span>`;
        setJsOutput((prev) => prev + log + "<br/>");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const startPiP = async () => {
    try {
      if (videoRef.current) {
        if (!document.pictureInPictureElement) {
          await videoRef.current.requestPictureInPicture();
          setIsPiP(true);
        } else {
          await document.exitPictureInPicture();
          setIsPiP(false);
        }
      }
    } catch (err) {
      console.error("PiP failed", err);
    }
  };

  return (
    <div
      className={`min-h-screen font-poppins p-4 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Code Environment</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-[90vh]">
        {/* Video Call */}
        <div
          className={`flex-1 shadow rounded-lg p-3 flex flex-col ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">Video Call</h2>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 rounded"
            style={{ backgroundColor: "#000" }}
          />
          <button
            onClick={startPiP}
            className={`mt-2 px-4 py-2 rounded hover:bg-opacity-80 bg-primary text-white`}
          >
            Toggle PiP
          </button>
          <div className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            PiP: {isPiP ? "Active" : "Not Active"}
          </div>
        </div>

        {/* Playground */}
        <div
          className={`flex-[2] shadow rounded-lg p-3 overflow-y-auto ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Code Playground</h2>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={`p-2 border rounded-md ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-gray-200"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              <option value="web">🌐 HTML/CSS/JS</option>
              <option value="python">🐍 Python</option>
            </select>
          </div>

          <Suspense fallback={<div>Loading editor...</div>}>
            {mode === "python" ? (
              <>
                <CodeMirror
                  value={pythonCode}
                  height="250px"
                  extensions={[python()]}
                  onChange={(value) => setPythonCode(value)}
                  theme={darkMode ? "dark" : "light"}
                />
                <button
                  onClick={runPython}
                  className="mt-3 px-4 py-2 bg-accent text-white rounded hover:bg-opacity-80 transition-colors"
                >
                  ▶️ Run Python
                </button>
                <pre
                  id="output"
                  className={`w-full h-32 mt-3 p-2 rounded overflow-y-auto text-sm ${
                    darkMode ? "bg-gray-900 text-green-400" : "bg-gray-800 text-green-400"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                ></pre>
                <input
                  id="python-input"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  className="border p-1 rounded w-full mt-1"
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <CodeMirror
                    value={htmlCode}
                    height="100px"
                    extensions={[html()]}
                    onChange={(value) => setHtmlCode(value)}
                    theme={darkMode ? "dark" : "light"}
                  />
                  <CodeMirror
                    value={cssCode}
                    height="100px"
                    extensions={[css()]}
                    onChange={(value) => setCssCode(value)}
                    theme={darkMode ? "dark" : "light"}
                  />
                  <CodeMirror
                    value={jsCode}
                    height="100px"
                    extensions={[javascript()]}
                    onChange={(value) => setJsCode(value)}
                    theme={darkMode ? "dark" : "light"}
                  />
                </div>
                <iframe
                  ref={iframeRef}
                  title="preview"
                  className="w-full h-64 mt-3 rounded border"
                />
                <button
                  onClick={() => setConsoleOpen(!consoleOpen)}
                  className="mt-2 px-4 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                >
                  {consoleOpen ? "Hide JS Console" : "Show JS Console"}
                </button>
                {consoleOpen && (
                  <pre
                    className={`mt-2 p-2 rounded overflow-y-auto text-sm h-32 ${
                      darkMode ? "bg-gray-900 text-green-400" : "bg-gray-900 text-black"
                    }`}
                    dangerouslySetInnerHTML={{ __html: jsOutput }}
                  />
                )}
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
