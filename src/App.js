import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { useFileUpload } from "use-file-upload";
import "./App.css";

function App() {
  const [workDone, setworkDone] = useState(0);

  const worker = createWorker({
    logger: (m) => console.log(m),
    logger: (m) => setworkDone(m.progress),
  });
  const [file, selectFile] = useFileUpload();
  const [filepath, setfilepath] = useState(null);

  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    if (filepath !== null) {
      const fileurl = URL.createObjectURL(filepath);
      const {
        data: { text },
      } = await worker.recognize(fileurl);
      setOcr(text);
    } else {
      return console.log("add image first");
    }
  };
  const [ocr, setOcr] = useState("Recognizing...");
  useEffect(() => {
    doOCR();
  }, [filepath]);

  return (
    <main>
      <button
        onClick={() => {
          // Single File Upload
          selectFile({}, ({ source, name, size, file }) => {
            // file - is the raw File Object
            setfilepath(file);
            console.log({ source, name, size, file });
          });
        }}
      >
        Click to Upload
      </button>

      {file ? (
        <div>
          <span> File Uploaded: </span> <br />
          <span> Name: {file.name} </span>
          <span> Size: {file.size} </span>
        </div>
      ) : (
        <span>No file selected</span>
      )}
      <div className="App">
        <p>Work done: {workDone * 100}%</p>
        <br />
        <p>{ocr}</p>
      </div>
    </main>
  );
}

export default App;
